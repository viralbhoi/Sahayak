import express from "express";
import * as clientController from "./client.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createClientSchema } from "./client.schema.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { idParamSchema } from "../common/idParam.schema.js";
import AppError from "../../utils/AppError.js";

const router = express.Router();

// Register client (public)
router.post("/", validate(createClientSchema), clientController.createClient);

// Get client profile (protected + ownership)
router.get(
    "/:id",
    protect,
    allowRoles("client"),
    validate(idParamSchema),
    (req, res, next) => {
        const paramId = Number(req.params.id);

        if (req.user.id !== paramId) {
            return next(
                new AppError("You can access only your own profile", 403),
            );
        }

        next();
    },
    clientController.getClientById,
);

export default router;
