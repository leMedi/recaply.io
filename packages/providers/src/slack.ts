import { ConversationsListResponse, WebClient } from "@slack/web-api";
import { env } from "./env";

type Channel = Exclude<
	ConversationsListResponse["channels"],
	undefined
>[number];

export async function exchangeAuthOCodeForAccessToken(code: string) {
	const web = new WebClient();

	const res = await web.oauth.v2.access({
		client_id: env.SLACK_CLIENT_ID,
		client_secret: env.SLACK_CLIENT_SECRET,
		code,
	});

	if (!res.ok) {
		throw new Error(res.error);
	}

	return res;
}

const scopes = [
	"users:read",
	"channels:read",
	"groups:read",
	"im:read",
	"channels:history",
	"groups:history",
	"im:history",
];
export function generateSlackAuth0Url(userId: string) {
	const url = new URL("https://slack.com/oauth/v2/authorize");
	url.searchParams.append("client_id", env.SLACK_CLIENT_ID);
	url.searchParams.append("user_scope", scopes.join(","));
	url.searchParams.append(
		"redirect_uri",
		`${env.NEXT_PUBLIC_URL}/api/callback/auth0/slack`,
	);
	url.searchParams.append("state", userId);

	return url.toString();
}

function getChannelType(channel: Channel): "public" | "private" | "im" {
	// if(channel.) {
	// 	return "im";
	// }
	if (channel.is_private) {
		return "private";
	}
	return "public";
}

export async function listChannels(accessToken: string) {
	const web = new WebClient(accessToken);

	const channels: Channel[] = [];

	let cusor: string | undefined;
	let reqCount = 0;
	do {
		const result = await web.conversations.list({
			exclude_archived: true,
			types: "public_channel,private_channel,im",
			limit: 9999999,
			cursor: cusor,
		});

		if (!result.ok) {
			throw new Error(result.error);
		}

		if (result.channels === undefined) {
			break;
		}

		channels.push(...result.channels);
		cusor = result.response_metadata?.next_cursor;

		reqCount++;
		if (reqCount > 20) break;
	} while (cusor);

	console.log(`Found ${channels.length} channels after ${reqCount} requests.`);

	return channels.map((channel) => ({
		id: channel.id!,
		name: channel.name!,
		type: getChannelType(channel),
	}));
}

export type SlackMessage = {
	ts: string;
	user: string;
	text: string;
};

const userCache: { [userId: string]: string } = {};
const getUserInfo = async (web: WebClient, userId: string) => {
	if (userCache[userId] !== undefined) {
		return userCache[userId];
	}

	const userInfo = await web.users.info({ user: userId });
	const name = userInfo.user?.real_name || "";
	userCache[userId] = name;
	return name;
};

const ignoredSubtypes = ["channel_join"];
export const getSlackChannelMessages = async (
	token: string,
	channelId: string,
	cutoffDate: number,
) => {
	try {
		console.log("getSlackChannelMessages", {
			token,
			channelId,
			cutoffDate,
		});

		const web = new WebClient(token);

		const result = await web.conversations.history({
			channel: channelId,
			// oldest: "1715122163.464",
			oldest: cutoffDate.toString(),
			include_all_metadata: true,
			inclusive: true,
		});

		if (!result.ok || result.messages === undefined) {
			throw new Error(`Failed to retrieve messages: ${result.error}`);
		}

		console.log(
			`Channel ${channelId}: ${result.messages.length} messages found.`,
		);

		const output: SlackMessage[] = [];
		for (const message of result.messages) {
			let username = message.user;
			if (username) {
				username = await getUserInfo(web, username);
			}

			if (message.subtype && ignoredSubtypes.includes(message.subtype)) {
				continue;
			}

			output.push({
				ts: message.ts ?? "",
				user: username ?? "",
				text: message.text ?? "",
			});
		}

		return output;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
