import { TriggerClient } from "@trigger.dev/sdk";
import { OpenAI } from "@trigger.dev/openai";
import { Resend } from "@trigger.dev/resend";

import { env } from "./env";

export const triggerDev = new TriggerClient({
	id: "recaply-b_vY", // env.TRIGGER_API_APP_ID,
	apiKey: env.TRIGGER_API_KEY,
	apiUrl: env.TRIGGER_API_URL,
});

export const triggerOpenai = new OpenAI({
	id: "openai",
	apiKey: process.env.OPENAI_API_KEY,
});

export const triggerResend = new Resend({
	id: "resend",
	apiKey: process.env.RESEND_API_KEY,
});
