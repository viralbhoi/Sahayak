import AppError from "../utils/AppError.js";

export const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Not authenticated", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError("Forbidden: Access denied", 403));
        }

        next();
    };
};
