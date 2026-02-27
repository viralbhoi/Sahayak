import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not authorized. No token provided.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        // decoded contains: { id, role, iat, exp }

        next();
    } catch (error) {
        next(new AppError("Invalid or expired token", 401));
    }
};
