var _a;
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./trpc/index.js";
import "dotenv/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
/**
 * the function that creates trpc context for each
 * request
 */
const createContext = ({ req, res, }) => ({});
/**
 * express app setup
 */
const app = express();
app.use(cors());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
/**
 * static site hosting
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (process.env.PROD === "true") {
    app.use(express.static(path.join(__dirname, "static")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "static", "index.html"));
    });
}
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
app.listen(PORT);
//# sourceMappingURL=index.js.map