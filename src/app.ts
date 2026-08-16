import helmet from "helmet";
import cors from "cors";
import express, { Application } from "express";
import { env } from "@config/env";
import { errorHandler } from "@middlewares/errorHandler.middleware";
import { notFound } from "@middlewares/notFound.middleware";
import { requestLogger } from "@middlewares/requestLogger.middleware";
import { routes } from "./routes";

const app: Application = express();

app.use(express.json({ limit: "200kb" }));

// security
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: false,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  }),
);

if (env.NODE_ENV === "development") {
  app.use(requestLogger);
}

// API that are going to be in use
app.use((req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});
app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
