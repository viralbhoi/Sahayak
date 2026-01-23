import express from "express";
import * as workerController from "./worker.controller.js";

const router = express.Router();

// Create worker
router.post("/", workerController.createWorker);

// Update availability
router.patch("/:id/availability", workerController.updateAvailability);

export default router;
