import express from "express";
import * as workerController from "./worker.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createWorkerSchema, availabilitySchema } from "./worker.schema.js";

const router = express.Router();

// Create worker
router.post("/", validate(createWorkerSchema), workerController.createWorker);

// Update availability
router.patch(
    "/:id/availability",
    validate(availabilitySchema),
    workerController.updateAvailability,
);

export default router;
