import express from "express";
import * as userController from "./user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateProfileSchema } from "./user.schema.js";

const router = express.Router();

router.get("/me", authenticate, userController.getProfile);

router.patch(
    "/me",
    authenticate,
    validate(updateProfileSchema),
    userController.updateProfile,
);

router.get("/:id", authenticate, userController.getPublicProfile);

export default router;
