import AppError from "../utils/AppError.js";

const validate = (schema) => (req, res, next) => {
    const payload = { ...req.params, ...req.body };

    const { error } = schema(payload);

    if (error) {
        return next(new AppError(error, 400));
    }

    next();
};

export default validate;
