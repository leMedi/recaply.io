import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
	server: {
		SLACK_CLIENT_ID: z.string(),
		SLACK_CLIENT_SECRET: z.string(),
		NEXT_PUBLIC_URL: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
