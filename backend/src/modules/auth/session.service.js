import * as sessionRepository from "./session.repository.js";
import { SESSION_EXPIRY_DAYS } from "./auth.constants.js";

/**
 * Create a new login session.
 */
export const create = async ({ user, metadata, refreshTokenHash = null }) => {
    const { deviceName, userAgent, ipAddress } = metadata;

    const expiresAt = new Date(
        Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    );

    return sessionRepository.create({
        userId: user.id,
        refreshTokenHash,
        deviceName,
        userAgent,
        ipAddress,
        expiresAt,
    });
};

/**
 * Find a session by id.
 */
export const findById = async (sessionId) => {
    return sessionRepository.findById(sessionId);
};

/**
 * Save / rotate refresh token hash.
 */
export const updateRefreshTokenHash = async (sessionId, refreshTokenHash) => {
    return sessionRepository.updateRefreshTokenHash(
        sessionId,
        refreshTokenHash,
    );
};

/**
 * Update last activity timestamp.
 */
export const touch = async (sessionId) => {
    return sessionRepository.updateLastActivity(sessionId);
};

/**
 * Logout current session.
 */
export const revoke = async (sessionId) => {
    return sessionRepository.revoke(sessionId);
};

/**
 * Logout from all devices.
 */
export const revokeAll = async (userId) => {
    return sessionRepository.revokeAll(userId);
};

/**
 * Get all active sessions of a user.
 */
export const getUserSessions = async (userId) => {
    return sessionRepository.findAllByUserId(userId);
};

/**
 * Cleanup expired sessions.
 * (Can later be called from a cron job.)
 */
export const cleanup = async () => {
    return sessionRepository.deleteExpired();
};
