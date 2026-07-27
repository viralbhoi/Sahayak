import { z } from "zod";

export const requestOtpSchema = z.object({
    body: z.object({
        phone: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    }),
});

export const verifyOtpSchema = z.object({
    body: z.object({
        phone: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

        otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
    }),
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, "Refresh token is required"),
    }),
});
