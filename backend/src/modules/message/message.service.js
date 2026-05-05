import * as repo from "./message.repository.js";
import * as jobRepository from "../job/job.repository.js";
import AppError from "../../utils/AppError.js";

export const sendMessage = async (jobId, user, message) => {
    if (!message) throw new AppError("Message required", 400);

    const job = await jobRepository.findJobById(jobId);
    const workerId = await jobRepository.getAssignedWorker(jobId);

    const isClient = job.client_id === user.id;
    const isWorker = workerId === user.id;

    if (!isClient && !isWorker) {
        throw new AppError("Unauthorized chat access", 403);
    }

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
