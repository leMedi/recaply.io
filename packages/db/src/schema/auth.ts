import { relations, sql } from "drizzle-orm";
import { index, integer, primaryKey, text } from "drizzle-orm/sqlite-core";

import { idStr, idStrPrimaryKey, mySqlLiteTable, sqlDateCol } from "./_table";
import { providers } from "./providers";

export const users = mySqlLiteTable("user", {
	id: idStrPrimaryKey("id"),
	name: text("name", { length: 255 }),
	email: text("email", { length: 255 }).notNull(),
	emailVerified: sqlDateCol("emailVerified").default(sql`CURRENT_TIMESTAMP`),
	image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	providers: many(providers),
}));

export const accounts = mySqlLiteTable(
	"account",
	{
		userId: idStr("userId").notNull(),
		type: text("type", { length: 255 })
			.$type<"oauth" | "oidc" | "email">()
			.notNull(),
		provider: text("provider", { length: 255 }).notNull(),
		providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
		refresh_token: text("refresh_token", { length: 255 }),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type", { length: 255 }),
		scope: text("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: text("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("accounts_userId_idx").on(account.userId),
	}),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mySqlLiteTable(
	"session",
	{
		sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
		userId: text("userId", { length: 255 }).notNull(),
		expires: sqlDateCol("expires").notNull(),
	},
	(session) => ({
		userIdIdx: index("sessions_userId_idx").on(session.userId),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mySqlLiteTable(
	"verificationToken",
	{
		identifier: text("identifier", { length: 255 }).notNull(),
		token: text("token", { length: 255 }).notNull(),
		expires: sqlDateCol("expires").notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);
