import * as userRepository from "../user/user.repository.js";
import * as sessionRepository from "./session.repository.js";
import * as tokenService from "./token.service.js";
import * as sessionService from "./session.service.js";
import * as otpStore from "./otp.store.js";
import * as constants from "./auth.constants.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const requestOtp = async (phone) => {
    const user = await userRepository.findByPhone(phone);

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

export const login = async (user, metadata) => {
    const session = await sessionService.create({
        user,
        metadata,
    });

    const refreshToken = tokenService.generateRefreshToken({
        sessionId: session.id,
    });

    const refreshTokenHash = await tokenService.hashToken(refreshToken);

    await sessionRepository.updateRefreshTokenHash(
        session.id,
        refreshTokenHash,
    );

    const accessToken = tokenService.generateAccessToken({
        userId: user.id,
        role: user.role,
        sessionId: session.id,
    });

    return {
        accessToken,
        refreshToken,
    };
};

export const refresh = async (refreshToken) => {
    const payload = tokenService.verifyRefreshToken(refreshToken);

    const session = await sessionRepository.findById(payload.sessionId);

    if (!session || session.revoked_at) {
        throw new AppError("Invalid session", 401);
    }

    const valid = await tokenService.compareToken(
        refreshToken,
        session.refresh_token_hash,
    );

    if (!valid) {
        throw new AppError("Invalid refresh token", 401);
    }

    await sessionRepository.updateLastActivity(session.id);

    const user = await userRepository.findById(session.user_id);

    const accessToken = tokenService.generateAccessToken({
        userId: user.id,
        role: user.role,
        sessionId: session.id,
    });

    return { accessToken };
};

export const logout = async (sessionId) => {
    await sessionRepository.revoke(sessionId);

    return {
        message: "Logged out successfully",
    };
};

export const logoutAll = async (userId) => {
    await sessionRepository.revokeAll(userId);

    return {
        message: "Logged out from all devices",
    };
};

export const getSessions = async (userId) => {
    return sessionRepository.findAllByUserId(userId);
};

export const verifyOtp = async ({ phone, otp, metadata }) => {
    const hashedOtp = await otpStore.getOtp(phone);

    if (!hashedOtp) throw new AppError("OTP expired", 400);

    const valid = await bcrypt.compare(otp, hashedOtp);

    if (!valid) throw new AppError("Invalid OTP", 400);

    await otpStore.deleteOtp(phone);
    await otpStore.resetOtpRequestCount(phone);

    const user = await userRepository.findByPhone(phone);

    return login(user, metadata);
};
