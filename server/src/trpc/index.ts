import { router, publicProcedure } from "./trpc.js";
export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return "the message is changing";
  }),
});
export type AppRouter = typeof appRouter;
