import { Router } from "express";
import { healthCheckRouter } from "./healthCheck.route";

const router = Router();

router.use("/", healthCheckRouter);

export { router as routes };
