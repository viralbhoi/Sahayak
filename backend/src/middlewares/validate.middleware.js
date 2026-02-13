import AppError from "../utils/AppError.js";

const validate = (schema) => (req, res, next) => {
    const { error } = schema(req.body);

    if (error) {
        return next(new AppError(error, 400));
    }

    next();
};

export default validate;
