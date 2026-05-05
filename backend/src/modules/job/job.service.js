import * as jobRepository from "./job.repository.js";
import * as matchingService from "../matching/matching.service.js";
import * as notificationRepository from "../notification/notification.repository.js";
import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data, clientId) => {
    const normalizedData = {
        ...data,
        skill: data.skill.toLowerCase().trim(),
    };

    const job = await jobRepository.createJob(normalizedData, clientId);
    await matchingService.runMatching(job.id);

    await notificationRepository.createNotification(
        clientId,
        "client",
        "Your job has been posted successfully",
    );

    return { jobId: job.id };
};

export const getMatches = async (jobId, user) => {
    const job = await jobRepository.findJobById(jobId);
    if (!job) {
        throw new AppError("Job not found", 404);
    }

    if (user.role === "client" && job.client_id !== user.id) {
        throw new AppError("You can access only your own jobs", 403);
    }

    return await jobRepository.getMatchesByJob(jobId);
};

export const getMyJobs = async (clientId) => {
    return await jobRepository.findByClientId(clientId);
};

export const getWorkerFeed = async (workerId) => {
    return await jobRepository.findJobsForWorker(workerId);
};

export const acceptJob = async (jobId, workerId) => {
    await jobRepository.assignJob(jobId, workerId);

    await notificationRepository.createNotification(
        job.client_id,
        "client",
        "A worker has accepted your job",
    );

    await notificationRepository.createNotification(
        workerId,
        "worker",
        "You accepted a job",
    );
};

export const startJob = async (jobId, workerId) => {
    await jobRepository.updateJobStatus(jobId, "in_progress");
};

export const completeJob = async (jobId, workerId) => {
    const job = await jobRepository.findJobById(jobId);
    await jobRepository.updateJobStatus(jobId, "completed");

    await notificationRepository.createNotification(
        job.client_id,
        "client",
        "Your job has been completed",
    );
};

export const getWorkerAssignments = async (workerId) => {
    return await jobRepository.getWorkerAssignments(workerId);
};

export const rateJob = async (jobId, clientId, rating, review) => {
    const job = await jobRepository.findJobById(jobId);

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    if (job.client_id !== clientId) {
        throw new AppError("Unauthorized", 403);
    }

    if (job.status !== "completed") {
        throw new AppError("Job not completed yet", 400);
    }

    const workerId = await jobRepository.getAssignedWorker(jobId);

    if (!workerId) {
        throw new AppError("No worker assigned", 400);
    }

    await jobRepository.createRating({
        jobId,
        clientId,
        workerId,
        rating,
        review,
    });

    await jobRepository.updateWorkerRating(workerId);

    await notificationRepository.createNotification(
        workerId,
        "worker",
        "You received a new rating",
    );

    return { message: "Rating submitted" };
};
