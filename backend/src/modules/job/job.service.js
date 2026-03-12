import * as jobRepository from "./job.repository.js";
import * as matchingService from "../matching/matching.service.js";
import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data) => {
    const { client_id, skill_id, city, area, urgency } = data;

    if (!client_id || !skill_id || !city) {
        throw new Error("client_id, skill_id, and city are required");
    }

    // 🔐 Transaction (VERY IMPORTANT)
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 1. Create job
        const job = await jobRepository.createJob(client, {
            client_id,
            skill_id,
            city,
            area,
            urgency,
        });

        // 2. Run matching
        const matchedWorkers = await matchingService.matchWorkers(client, job);

        await client.query("COMMIT");

        return {
            job,
            matched_workers: matchedWorkers,
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getMatches = async (jobId, user) => {
    const job = await jobRepository.findJobById(jobId);

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    // Ownership check (only for clients)
    if (user.role === "client" && job.client_id !== user.id) {
        throw new AppError("You can access only your own jobs", 403);
    }

    return await jobRepository.getMatches(jobId);
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