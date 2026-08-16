import { logger } from "@config/logger";
import { ApiResponse } from "@utils/apiResponse";
import { asyncHandler } from "@utils/asyncHandler";
import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const healthCheckRouter = Router();

healthCheckRouter.route("/healthcheck").get(
  asyncHandler(async (_req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    logger.info("Get called ASAP");

    res.status(200).json(
      new ApiResponse(
        200,
        {
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          database: dbState,
        },
        "Service is healthy",
      ),
    );
  }),
);

export { healthCheckRouter };
