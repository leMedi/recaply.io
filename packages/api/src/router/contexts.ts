import type { TRPCRouterRecord } from "@trpc/server";
import { revalidatePath } from "next/cache";

import { and, desc, eq, inArray, isNull, schema } from "@recaply/db";

import { zNewContext } from "@recaply/db/schema/contexts";
import { protectedProcedure } from "../trpc";
import { Events, triggerDev } from "@recaply/jobs";

export const contextsRouter = {
	all: protectedProcedure.query(({ ctx }) => {
		const res = ctx.db.query.contexts.findMany({
			columns: {
				id: true,
				name: true,
				recapeTime: true,
				recapeTimeSpan: true,
				createdAt: true,
				updatedAt: true,
			},
			where: and(
				isNull(schema.providers.deletedAt),
				eq(schema.providers.userId, ctx.session.user.id),
			),
			orderBy: desc(schema.providers.id),
		});

		return res;
	}),

	add: protectedProcedure
		.input(zNewContext)
		.mutation(async ({ ctx, input }) => {
			const providers = await ctx.db.query.providers.findMany({
				where: and(
					isNull(schema.providers.deletedAt),
					eq(schema.providers.userId, ctx.session.user.id),
					inArray(
						schema.providers.id,
						Object.keys(input.providersConfig).map(Number),
					),
				),
			});

			if (providers.length !== Object.keys(input.providersConfig).length) {
				throw new Error("Invalid provider");
			}

			const [context] = await ctx.db
				.insert(schema.contexts)
				.values({
					...input,
					userId: ctx.session.user.id,
				})
				.returning();

			await triggerDev.sendEvent({
				id: `context-id-${context!.id}`,
				name: Events.SCHEDULE_RECAPE,
				payload: {
					contextId: context!.id,
				},
			});

			revalidatePath("/dashboard");

			return context;
		}),

	// delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
	// 	return ctx.db
	// 		.delete(schema.providers)
	// 		.where(eq(schema.providers.id, input));
	// }),
} satisfies TRPCRouterRecord;
