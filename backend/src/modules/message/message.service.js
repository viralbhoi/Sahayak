import * as repo from "./message.repository.js";
import AppError from "../../utils/AppError.js";

export const sendMessage = async (jobId, user, message) => {
    if (!message) throw new AppError("Message required", 400);

    return repo.createMessage({
        jobId,
        senderId: user.id,
        senderRole: user.role,
        message,
    });
};

export const getMessages = async (jobId) => {
    return repo.getMessagesByJob(jobId);
};
