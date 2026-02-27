import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as authService from "./auth.service.js";

export const requestOtp = asyncHandler(async (req, res) => {
    const result = await authService.requestOtp(req.body.phone);
    success(res, result);
});

export const verifyOtp = asyncHandler(async (req, res) => {
    const token = await authService.verifyOtp(req.body.phone, req.body.otp);

    success(res, { token });
});
