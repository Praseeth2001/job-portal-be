import { Request, Response, NextFunction } from "express";
import { ApiError } from "@utils/apiError";
import { env } from "@config/env";
import { logger } from "@config/logger";

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors: unknown[] = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof Error && env.NODE_ENV === "development") {
    message = err.message;
  }

  // TODO: replace with the Winston/Pino logger once Story 0.4 lands
  logger.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.NODE_ENV === "development" && err instanceof Error ? { stack: err.stack } : {}),
  });
};

export { errorHandler };
