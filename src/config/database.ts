import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectDB(retriesLeft: number = MAX_RETRIES): Promise<void> {
  try {
    await mongoose.connect(env.MONGO_URI, {dbName: "job-portal",});
    logger.info("✅ MongoDB connected");
  } catch (error) {
    if (retriesLeft > 0) {
      logger.error(
        `❌ MongoDB connection failed. Retrying in ${RETRY_DELAY_MS / 1000}s... (${retriesLeft} attempts left)`,
      );
      await sleep(RETRY_DELAY_MS);
      return connectDB(retriesLeft - 1);
    }

    logger.error("❌ MongoDB connection failed after maximum retries. Exiting.");
    logger.error(error);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  logger.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("✅ MongoDB reconnected");
});

mongoose.connection.on("error", (error) => {
  logger.error("❌ MongoDB connection error:", error);
});
