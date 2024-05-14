import type { TRPCRouterRecord } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { and, desc, eq, inArray, isNotNull, isNull, schema } from "@recaply/db";

import { zNewContext } from "@recaply/db/schema/contexts";
import { protectedProcedure } from "../trpc";
import { Events, triggerDev } from "@recaply/jobs";
import { z } from "zod";

export const contextsRouter = {
	all: protectedProcedure.query(({ ctx }) => {
		const res = ctx.db.query.contexts.findMany({
			columns: {
				id: true,
				name: true,
				recapTime: true,
				recapTimeSpan: true,
				disabledAt: true,
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

	enable: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input }) => {
			const [context] = await ctx.db
				.update(schema.contexts)
				.set({
					disabledAt: null,
				})
				.where(
					and(
						eq(schema.contexts.id, input),
						isNotNull(schema.contexts.disabledAt),
						isNull(schema.contexts.deletedAt),
					),
				)
				.returning();

			if (!context) {
				throw new Error("Context not found");
			}

			await triggerDev.sendEvent({
				id: `context-id-${context.id}-${nanoid()}`,
				name: Events.SCHEDULE_RECAPE,
				payload: {
					contextId: context.id,
				},
			});

			revalidatePath("/dashboard");

			return true;
		}),

	disable: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input }) => {
			const [context] = await ctx.db
				.update(schema.contexts)
				.set({
					disabledAt: new Date(),
				})
				.where(
					and(eq(schema.contexts.id, input), isNull(schema.contexts.deletedAt)),
				)
				.returning();

			if (!context) {
				throw new Error("Context not found");
			}

			console.log("disable sending event");
			const res = await triggerDev.sendEvent({
				id: `context-id-${context.id}-${nanoid()}`,
				name: Events.UNSCHEDULE_RECAP,
				payload: {
					contextId: context.id,
				},
			});
			console.log("disable sent event", res);

			revalidatePath("/dashboard");

			return true;
		}),

	// delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
	// 	return ctx.db
	// 		.delete(schema.providers)
	// 		.where(eq(schema.providers.id, input));
	// }),
} satisfies TRPCRouterRecord;
