import express from "express";
import * as authController from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { requestOtpSchema, verifyOtpSchema } from "./auth.schema.js";

const router = express.Router();

router.post(
    "/request-otp",
    validate(requestOtpSchema),
    authController.requestOtp,
);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

export default router;
