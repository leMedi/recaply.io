import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import {
	idAutoIncrementPrimaryKey,
	idStr,
	mySqlLiteTable,
	timestampColumns,
} from "./_table";
import { users } from "./auth";

export const providers = mySqlLiteTable("providers", {
	id: idAutoIncrementPrimaryKey("id"),
	type: text("type", { length: 256 }).notNull(),
	label: text("label", { length: 256 }).notNull().default(""),
	creds: text("creds", { mode: "json" }).notNull(),
	userId: idStr("user_id").notNull(),
	...timestampColumns,
});

export const providerRelations = relations(providers, ({ one }) => ({
	user: one(users, { fields: [providers.userId], references: [users.id] }),
}));

export const zSlackCreds = z.object({
	appId: z.string(),
	scope: z.string(),
	accessToken: z.string(),
	refreshToken: z.string().nullable(),
	tokenType: z.string(),
	teamId: z.string(),
	teamName: z.string(),
});

const SupportedProviders = ["slack"] as const;
export type SupportedProvider = (typeof SupportedProviders)[number];

export const zProvider = createSelectSchema(providers, {
	type: z.enum(SupportedProviders),
	creds: zSlackCreds,
});
export type ProviderWithCreds = z.infer<typeof zProvider>;
export type Provider = Omit<ProviderWithCreds, "creds">;

export const newProvider = createInsertSchema(providers, {
	type: z.enum(SupportedProviders),
	creds: zSlackCreds,
	userId: z.number(),
});
