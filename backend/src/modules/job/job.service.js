import * as jobRepository from "./job.repository.js";
import * as matchingService from "../matching/matching.service.js";
import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data, clientId) => {
    const normalizedData = {
        ...data,
        skill: data.skill.toLowerCase().trim(),
    };

    const job = await jobRepository.createJob(normalizedData, clientId);
    await matchingService.runMatching(job.id);

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
};

export const startJob = async (jobId, workerId) => {
    await jobRepository.updateJobStatus(jobId, "in_progress");
};

export const completeJob = async (jobId, workerId) => {
    await jobRepository.updateJobStatus(jobId, "completed");
};

export const getWorkerAssignments = async (workerId) => {
    return await jobRepository.getWorkerAssignments(workerId);
};