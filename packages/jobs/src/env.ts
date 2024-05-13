import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
	server: {
		TRIGGER_API_APP_ID: z.string(),
		TRIGGER_API_KEY: z.string(),
		TRIGGER_API_URL: z.string(),
		OPENAI_API_KEY: z.string(),
		RESEND_API_KEY: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
