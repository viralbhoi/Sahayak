import express from "express";
import * as jobController from "./job.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createJobSchema} from "./job.schema.js";
import { idParamSchema } from "../common/idParam.schema.js";

const router = express.Router();

// Create job
router.post("/", validate(createJobSchema), jobController.createJob);

// Get matches for a job
router.get("/:id/matches", validate(idParamSchema), jobController.getMatches);

export default router;
