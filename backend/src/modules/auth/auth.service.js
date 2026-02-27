import * as authRepository from "./auth.repository.js";
import AppError from "../../utils/AppError.js";
import { generateToken } from "../../utils/jwt.js";

export const requestOtp = async (phone) => {
    const user = await authRepository.findUserByPhone(phone);

    if (!user) {
        throw new AppError("User not registered", 404);
    }

    // Rate limit check
    const recentCount = await authRepository.countRecentOtps(phone);

    if (recentCount >= 3) {
        throw new AppError(
            "Too many OTP requests. Try again after 5 minutes.",
            429,
        );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await authRepository.saveOtp(phone, otp, expiresAt);

    console.log("OTP:", otp);

    return { message: "OTP sent successfully" };
};

export const verifyOtp = async (phone, otp) => {
    const record = await authRepository.findValidOtp(phone, otp);

    if (!record) {
        throw new AppError("Invalid or expired OTP", 400);
    }

    const user = await authRepository.findUserByPhone(phone);

    const token = generateToken({
        id: user.id,
        role: user.role,
    });

    return token;
};
