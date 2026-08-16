import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import { connectDB } from "@config/database";
import app from "./app";
import { logger } from "@config/logger";
import { env } from "@config/env";

async function bootstrap(): Promise<void> {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
  });
}

bootstrap();
