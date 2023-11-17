import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { inferAsyncReturnType } from "@trpc/server";
import { appRouter } from "./trpc/index.js";
import "dotenv/config";
import path from "path";
import { AppDataSource } from "./data-source.js";

/**
 * the function that creates trpc context for each
 * request
 */
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

/**
 * express app setup
 */
const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

/**
 * static site hosting
 */

if (process.env.PROD === "true") {
  app.use(express.static(path.join(__dirname, "static")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
  });
}

const PORT = process.env.PORT ?? 8000;


/**
 * Typeorm initialization
 */

AppDataSource.initialize()
  .then(() => {
    console.log("Database initialized successfully...")
  })
  .catch((error) => console.log(error));

app.listen(PORT);
