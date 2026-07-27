import AppError from "../utils/AppError.js";
import { ZodError } from "zod";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new AppError(
                        error.issues.map((issue) => ({
                            field: issue.path.join("."),
                            message: issue.message,
                        })),
                        400,
                    ),
                );
            }

            next(error);
        }
    };
};

export default validate;
