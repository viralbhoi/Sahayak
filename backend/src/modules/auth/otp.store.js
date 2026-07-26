import redis from "../../config/redis.js";
import { OTP_EXPIRY_SECONDS } from "./auth.constants.js";

export const saveOtp = async (phone, hashedOtp) => {
    await redis.set(`otp:${phone}`, hashedOtp, "EX", OTP_EXPIRY_SECONDS);
};

export const getOtp = async (phone) => {
    return await redis.get(`otp:${phone}`);
};

export const deleteOtp = async (phone) => {
    await redis.del(`otp:${phone}`);
};

/**
 * Increment OTP request count.
 * TTL is only set on the first request.
 */
export const incrementOtpRequestCount = async (phone) => {
    const key = `otp_requests:${phone}`;

    const count = await redis.incr(key);

    if (count === 1) {
        await redis.expire(key, OTP_EXPIRY_SECONDS);
    }

    return count;
};

export const getOtpRequestCount = async (phone) => {
    const count = await redis.get(`otp_requests:${phone}`);

    return Number(count || 0);
};

export const resetOtpRequestCount = async (phone) => {
    await redis.del(`otp_requests:${phone}`);
};
