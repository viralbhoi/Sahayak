import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import * as tokenService from "../modules/auth/token.service.js";
import * as sessionService from "../modules/auth/session.service.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authentication required", 401);
    }

    const accessToken = authHeader.split(" ")[1];

    const payload = tokenService.verifyAccessToken(accessToken);

    const session = await sessionService.findById(payload.sessionId);

    if (!session) {
        throw new AppError("Session not found or expired", 401);
    }

    await sessionService.touch(session.id);

    req.user = {
        userId: payload.userId,
        role: payload.role,
        sessionId: payload.sessionId,
    };

    next();
});
