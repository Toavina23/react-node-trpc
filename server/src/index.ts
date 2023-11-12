import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const appRouter = router({
  hello: publicProcedure.query(async () => {
    return "the message is changing";
  }),
});
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});
server.listen(8000);
