import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";

import { and, db, eq, isNull, schema } from "@recaply/db";
import { Context } from "@recaply/db/schema/contexts";
import { ProviderWithCreds } from "@recaply/db/schema/providers";
import { slack } from "@recaply/providers";
import { addMinutes, subDays, subHours } from "date-fns";
import { nanoid } from "nanoid";
import { triggerDev, triggerOpenai, triggerResend } from "../client";
import { Events } from "../constants";
import OpenAI from "openai";
import { env } from "../env";

triggerDev.defineJob({
	id: "SCHEDULE_RECAPE",
	name: "Schedule Recap",
	version: "1.0.0",
	trigger: eventTrigger({
		name: Events.SCHEDULE_RECAPE,
		schema: z.object({
			contextId: z.number(),
		}),
	}),
	integrations: {},
	run: async (payload, io) => {
		const { contextId } = payload;

		const context = await db.query.contexts.findFirst({
			where: and(
				eq(schema.providers.id, contextId),
				isNull(schema.providers.deletedAt),
			),
		});

		if (!context) {
			throw new Error("Context not found");
		}

		const nowUTC = getUTCDate();
		nowUTC.setHours(Number(context.recapTime));
		const backToUTC = addMinutes(nowUTC, context.timeZoneOffset);

		console.log("recap_time", context.recapTime, "UTC", backToUTC.getHours());
		io.logger.info("recap_time", {
			recapTime: context.recapTime,
			recapTimeUTC: backToUTC.getHours(),
		});

		await recepeSchedule.register(context.id.toString(), {
			type: "cron",
			options: {
				cron: `0 ${backToUTC.getHours()} * * 1-5`,
			},
		});
	},
});

triggerDev.defineJob({
	id: "UNSCHEDULE_RECAP",
	name: "Unschedule Recap",
	version: "1.0.0",
	trigger: eventTrigger({
		name: Events.UNSCHEDULE_RECAP,
		schema: z.object({
			contextId: z.number(),
		}),
	}),
	integrations: {},
	run: async (payload, io) => {
		const { contextId } = payload;

		await recepeSchedule.unregister(contextId.toString());
	},
});

const recepeSchedule = triggerDev.defineDynamicSchedule({
	id: "recepeSchedule",
});

type Message = {
	channelId: string;
	content: string;
	timestamp: string;
	user: string;
};

const getUTCDate = () => {
	const date = new Date();
	return addMinutes(date, date.getTimezoneOffset());
};

triggerDev.defineJob({
	id: "MAKE_RECAPE",
	name: "Make Recap",
	version: "1.0.0",
	trigger: recepeSchedule,
	integrations: {
		openai: triggerOpenai,
		resend: triggerResend,
	},
	run: async (payload, io, ctx) => {
		console.log("MAKE_RECAPE payload", payload);
		console.log("MAKE_RECAPE ctx", ctx);

		// const contextId = Number(ctx.source!.id);
		const contextId = 2;

		const context = await db.query.contexts.findFirst({
			where: and(
				eq(schema.contexts.id, contextId),
				isNull(schema.contexts.deletedAt),
			),
			with: {
				user: true,
			},
		});

		if (!context) {
			throw new Error("Context not found");
		}

		// const cutoffDate = subHours(new Date(), Number(context.recapTimeSpan));
		const cutoffDate = subDays(new Date(), 1);
		const cuteOfTimestamp = cutoffDate.getTime() / 1000;

		io.logger.debug("cuteOfTimestamp", {
			cutoffDate,
			cuteOfTimestamp,
		});

		// fetch slack messages
		const messages = await io.runTask("MESSAGES", async () => {
			const providersConfig = Object.values(
				(context as Context).providersConfig,
			);

			const messages: Message[] = [];
			for (const config of providersConfig) {
				// if (provider.type === "slack")

				const providerMessages = await io.runTask(
					`PROVIDER_MESSAGES_${config.type}_${config.providerId}`,
					async () => {
						const provider = await db.query.providers.findFirst({
							where: and(
								eq(schema.providers.id, config.providerId),
								isNull(schema.providers.deletedAt),
							),
						});

						if (!provider) throw new Error("Provider not found");

						const providerMessages: Message[] = [];
						for (const channel of config.channels) {
							console.log("getSlackChannelMessages", {
								accessToken: (provider as ProviderWithCreds).creds.accessToken,
								channel,
								cuteOfTimestamp,
							});

							// TODO: handle pagination in io.runTask
							const channelMessages = await io.runTask(
								`SLACK_CHANNEL_${channel}_MESSAGES`,
								async () => {
									return slack.getSlackChannelMessages(
										(provider as ProviderWithCreds).creds.accessToken,
										channel,
										cuteOfTimestamp,
									);
								},
							);

							providerMessages.push(
								...channelMessages.map((message) => ({
									channelId: channel,
									content: message.text,
									timestamp: message.ts,
									user: message.user,
								})),
							);
						}

						return providerMessages;
					},
				);

				messages.push(...providerMessages);
			}

			return messages;
		});

		io.logger.debug("messages", {
			messages,
		});

		if (messages.length === 0) {
			io.logger.info("no messages to generate a recap");
			return;
		}

		// TODO: sort messages by timestamp

		// summarize messages
		const _context = `${context.name} - ${context.description}`;
		const completion = await io.openai.chat.completions.create("recap", {
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: getPromptToSummariseMessages(
						context.user.name ?? "",
						_context,
						messages,
					),
				},
			],
		});

		if (completion.choices.length !== 1) {
			throw new Error("Unexpected completion");
		}

		const recap = completion.choices[0]!.message.content;

		if (!recap) {
			io.logger.info("no important things discussed");
			return;
		}

		io.logger.info("recap done", {
			recap,
		});

		if (recap === "NO_IMPORTANT_THINGS_DISCUSSED") {
			io.logger.info("no important things discussed");
			return;
		}

		await io.wait("take a breath", 10);

		// TODO: generate audio
		const b64AudioRecap = await io.runTask("AUDIO", async () => {
			const openai = new OpenAI({
				apiKey: env.OPENAI_API_KEY,
			});

			const audioRecapStream = await openai.audio.speech.create({
				model: "tts-1",
				voice: "shimmer",
				speed: 1,
				input: recap,
			});

			return Buffer.from(await audioRecapStream.arrayBuffer()).toString(
				"base64",
			);
		});

		await io.resend.emails.send("recap-ready", {
			to: context.user.email,
			subject: `Your recap for ${context.name} is ready`,
			from: "Recaply <contact@notifications.recaply.io>",
			text: `Hello, your recap for ${context.name} is ready, here is a summary of the important things discussed in the past ${context.recapTimeSpan} hours of messages related to the context:
${recap}

Regards,
Recaply Team
			`,
			attachments: [
				{
					filename: `${context.name}-summary.mp3`,
					content: b64AudioRecap,
				},
			],
			headers: {
				"X-Entity-Ref-ID": nanoid(),
			},
		});
	},
});

function getPromptToSummariseMessages(
	userName: string,
	context: string,
	messages: Message[],
) {
	return `You are Recaply my assitant and I need me a bried summary of the things discussed in the past 24 hours of messages related to the context
make it short and in paragraphs, if there are not important things just say that there are no important things discussed
also my name is ${userName}

addintional instructions:
- don't include any links
- don't include any code
- refre to the people by their first name only
- if no important things discussed just as a response only 'NO_IMPORTANT_THINGS_DISCUSSED' and don't include any other text.

<context>
${context}
<context>

<messages>
${messages.map((m) => `${m.user} said: ${m.content}`).join("\n")}
</messages>
`;
}
