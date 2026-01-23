import * as jobRepository from "./job.repository.js";
import * as matchingService from "../matching/matching.service.js";
import pool from "../../config/db.js";

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

export const getMatches = async (jobId) => {
    const client = await pool.connect();
    try {
        return await jobRepository.getMatchesByJob(client, jobId);
    } finally {
        client.release();
    }
};
