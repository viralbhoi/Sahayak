import express from "express";
import * as jobController from "./job.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createJobSchema } from "./job.schema.js";
import { idParamSchema } from "../common/idParam.schema.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Create job
router.post(
    "/",
    protect,
    allowRoles("client"),
    validate(createJobSchema),
    jobController.createJob,
);

// Get my jobs ⭐ NEW
router.get("/my-jobs", protect, allowRoles("client"), jobController.getMyJobs);

// Get matches
router.get(
    "/:id/matches",
    protect,
    allowRoles("client"),
    validate(idParamSchema),
    jobController.getMatches,
);

router.get(
    "/worker-feed",
    protect,
    allowRoles("worker"),
    jobController.getWorkerFeed,
);

router.post(
    "/:id/accept",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    jobController.acceptJob,
);

router.patch(
    "/:id/start",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    jobController.startJob,
);

router.patch(
    "/:id/complete",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    jobController.completeJob,
);

router.get(
    "/worker-assignments",
    protect,
    allowRoles("worker"),
    jobController.getWorkerAssignments,
);

export default router;
