import express from "express";
import * as jobController from "./job.controller.js";

const router = express.Router();

// Create job
router.post("/", jobController.createJob);

// Get matches for a job
router.get("/:id/matches", jobController.getMatches);

export default router;
