import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq, isNull, schema } from "@recaply/db";

import type { ProviderWithCreds } from "@recaply/db/schema/providers";
import { slack } from "@recaply/providers";
import { protectedProcedure } from "../trpc";

export const providersRouter = {
	all: protectedProcedure.query(({ ctx }) => {
		return ctx.db.query.providers.findMany({
			columns: {
				id: true,
				type: true,
				label: true,
				createdAt: true,
				updatedAt: true,
			},
			where: and(
				isNull(schema.providers.deletedAt),
				eq(schema.providers.userId, ctx.session.user.id),
			),
			orderBy: desc(schema.providers.id),
		});
	}),

	getSlackOptions: protectedProcedure
		.input(z.object({ providerId: z.number() }))
		.query(async ({ ctx, input }) => {
			const provdier = await ctx.db.query.providers.findFirst({
				where: and(
					eq(schema.providers.id, input.providerId),
					eq(schema.providers.userId, ctx.session.user.id),
					isNull(schema.providers.deletedAt),
				),
			});

			if (!provdier) {
				throw new Error("Provider not found");
			}

			return {
				providerId: provdier.id,
				channels: await slack.listChannels(
					(provdier as ProviderWithCreds).creds.accessToken,
				),
			};
		}),

	// delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
	// 	return ctx.db
	// 		.delete(schema.providers)
	// 		.where(eq(schema.providers.id, input));
	// }),
} satisfies TRPCRouterRecord;
