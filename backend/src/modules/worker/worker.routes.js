import express from "express";
import * as workerController from "./worker.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createWorkerSchema, availabilitySchema } from "./worker.schema.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import AppError from "../../utils/AppError.js";
import { idParamSchema } from "../common/idParam.schema.js";

const router = express.Router();

// Create worker (public)
router.post("/", validate(createWorkerSchema), workerController.createWorker);

// Get worker profile (protected)
router.get(
    "/:id",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    workerController.getWorkerById,
);

// Update availability (protected + ownership)
router.patch(
    "/:id/availability",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    validate(availabilitySchema),
    (req, res, next) => {
        const paramId = Number(req.params.id);

        if (req.user.id !== paramId) {
            return next(
                new AppError("You can update only your own profile", 403),
            );
        }

        next();
    },
    workerController.updateAvailability,
);

// Update skills
router.patch(
    "/:id/skills",
    protect,
    allowRoles("worker"),
    validate(idParamSchema),
    (req, res, next) => {
        if (req.user.id !== Number(req.params.id)) {
            return next(
                new AppError("You can update only your own profile", 403),
            );
        }
        next();
    },
    workerController.updateSkills,
);

export default router;
