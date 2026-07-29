import * as userRepository from "./user.repository.js";
import AppError from "../../utils/AppError.js";

export const getProfile = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

export const updateProfile = async (userId, { name, email }) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (email && email !== user.email) {
        const existing = await userRepository.findByEmail(email);

        if (existing) {
            throw new AppError("Email already in use", 409);
        }
    }

    return await userRepository.update({
        id: userId,
        name,
        email,
    });
};

export const getPublicProfile = async (userId) => {
    const user = await userRepository.findPublicProfile(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};
