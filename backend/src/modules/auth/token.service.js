import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import {
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
    OTP_HASH_ROUNDS,
} from "./auth.constants.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        {
            ...payload,
            type: "access",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        },
    );
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        {
            ...payload,
            type: "refresh",
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        },
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export const hashToken = async (token) => {
    return await bcrypt.hash(token, OTP_HASH_ROUNDS);
};

export const compareToken = async (token, hash) => {
    return await bcrypt.compare(token, hash);
};

export const generateSecureToken = () => {
    return crypto.randomBytes(64).toString("hex");
};
