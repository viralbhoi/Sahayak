import express from "express";
import * as authController from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
    requestOtpSchema,
    verifyOtpSchema,
    refreshTokenSchema,
} from "./auth.schema.js";

const router = express.Router();

/**
 * Public Routes
 */
router.post(
    "/request-otp",
    validate(requestOtpSchema),
    authController.requestOtp,
);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

router.post("/refresh", validate(refreshTokenSchema), authController.refresh);

/**
 * Protected Routes
 */
router.post("/logout", authenticate, authController.logout);

router.post("/logout-all", authenticate, authController.logoutAll);

router.get("/sessions", authenticate, authController.getSessions);

router.get("/me", authenticate, authController.me);

export default router;
