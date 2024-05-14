import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import {
	idAutoIncrementPrimaryKey,
	idStr,
	mySqlLiteTable,
	timestampColumns,
} from "./_table";
import { users } from "./auth";
import { zProvider } from "./providers";

export const contexts = mySqlLiteTable("contexts", {
	id: idAutoIncrementPrimaryKey("id"),
	userId: idStr("user_id").notNull(),

	name: text("type", { length: 256 }).notNull(),
	description: text("description", { length: 256 }),

	timeZoneOffset: integer("time_zone_offset").default(0).notNull(),

	recapeTime: text("recape_time", { length: 256 }).notNull(),
	recapeTimeSpan: text("recape_time_span", { length: 256 }).notNull(),

	providersConfig: text("providers", { mode: "json" }).notNull(),

	...timestampColumns,
});

export const contextsRelations = relations(contexts, ({ one }) => ({
	user: one(users, { fields: [contexts.userId], references: [users.id] }),
}));

const zSlackConfig = z.object({
	providerId: zProvider.shape.id,
	type: z.literal("slack"),
	channels: z.array(z.string()),
});

export const zProviderConfig = z
	.record(z.string(), z.discriminatedUnion("type", [zSlackConfig]))
	.refine(
		(v) =>
			Object.values(v).some((p) => {
				if (p.type === "slack") {
					return p.channels.length > 0;
				}
				return false;
			}),
		"At least one slack provider must have at least one channel",
	);

export const zContext = createSelectSchema(contexts, {
	providersConfig: zProviderConfig,
});
export type Context = z.infer<typeof zContext>;

export const zNewContext = createInsertSchema(contexts, {
	providersConfig: z
		.record(z.string(), z.discriminatedUnion("type", [zSlackConfig]))
		.refine(
			(v) =>
				Object.values(v).some((p) => {
					if (p.type === "slack") {
						return p.channels.length > 0;
					}
					return false;
				}),
			"At least one slack provider must have at least one channel",
		),
}).omit({
	id: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});
