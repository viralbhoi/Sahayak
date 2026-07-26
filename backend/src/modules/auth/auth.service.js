import * as authRepository from "./auth.repository.js";
import * as otpStore from "./otp.store.js";
import * as constants from "./auth.constants.js";
import AppError from "../../utils/AppError.js";
import { generateToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const requestOtp = async (phone) => {
    const user = await authRepository.findUserByPhone(phone);

    if (!user) {
        throw new AppError("User not registered", 404);
    }

    // Rate limit check
    const count = await otpStore.incrementOtpRequestCount(phone);

    if (count > constants.OTP_REQUEST_LIMIT) {
        throw new AppError(
            "Too many OTP requests. Try again after 5 minutes.",
            429,
        );
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const hashedOtp = await bcrypt.hash(otp, constants.OTP_HASH_ROUNDS);

    await otpStore.saveOtp(phone, hashedOtp);

    // TODO: Send OTP using Twilio

    return { message: "OTP sent successfully" };
};

export const verifyOtp = async (phone, otp) => {
    const hashedOtp = await otpStore.getOtp(phone);

    if (!hashedOtp) {
        throw new AppError("Invalid or expired OTP", 400);
    }

    const isMatch = await bcrypt.compare(otp, hashedOtp);

    if (!isMatch) {
        throw new AppError("Invalid or expired OTP", 400);
    }

    await otpStore.deleteOtp(phone);

    await otpStore.resetOtpRequestCount(phone);

    const user = await authRepository.findUserByPhone(phone);

    return generateToken({
        id: user.id,
        role: user.role,
    });
};
