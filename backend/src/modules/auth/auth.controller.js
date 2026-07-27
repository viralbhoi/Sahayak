import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as authService from "./auth.service.js";

export const requestOtp = asyncHandler(async (req, res) => {
    const result = await authService.requestOtp(req.body.phone);

    success(res, result);
});

export const verifyOtp = asyncHandler(async (req, res) => {
    const metadata = {
        deviceName: req.headers["sec-ch-ua-platform"] || "Unknown",
        userAgent: req.headers["user-agent"] || "Unknown",
        ipAddress: req.ip,
    };

    const tokens = await authService.verifyOtp({
        phone: req.body.phone,
        otp: req.body.otp,
        metadata,
    });

    success(res, tokens);
});

export const refresh = asyncHandler(async (req, res) => {
    const result = await authService.refresh(req.body.refreshToken);

    success(res, result);
});

export const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.sessionId);

    success(res, {
        message: "Logged out successfully",
    });
});

export const logoutAll = asyncHandler(async (req, res) => {
    await authService.logoutAll(req.user.userId);

    success(res, {
        message: "Logged out from all devices",
    });
});

export const getSessions = asyncHandler(async (req, res) => {
    const sessions = await authService.getSessions(req.user.userId);

    success(res, sessions);
});

export const me = async (userId) => {
    const user = await authRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};
