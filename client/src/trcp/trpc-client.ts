import { type AppRouter } from "server/src";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>();
