import { authRouter } from "./router/auth";
import { contextsRouter } from "./router/contexts";
import { providersRouter } from "./router/providers";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	providers: providersRouter,
	contexts: contextsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
