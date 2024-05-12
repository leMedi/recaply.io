import { createEnv } from "@t3-oss/env-core";
import type { Config } from "drizzle-kit";
import * as z from "zod";

const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		DATABASE_AUTH_TOKEN: z.string().optional(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

export const dbCreds = {
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
};

export default {
	schema: "./src/schema",
	out: "./migrations",
	driver: "turso",
	dialect: "sqlite",
	dbCredentials: {
		...dbCreds,
	},
	tablesFilter: ["recaply_*"],
} satisfies Config;
