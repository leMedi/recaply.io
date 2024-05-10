import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { db, schema } from "@recaply/db";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const authConfig = {
	adapter: DrizzleAdapter(db, {
		usersTable: schema.users,
		accountsTable: schema.accounts,
		sessionsTable: schema.sessions,
		verificationTokensTable: schema.verificationTokens,
	}),
	providers: [Google],
	callbacks: {
		session: (opts) => {
			if (!("user" in opts)) throw "unreachable with session strategy";

			return {
				...opts.session,
				user: {
					...opts.session.user,
					id: opts.user.id,
				},
			};
		},
	},
} satisfies NextAuthConfig;
