import * as matchingRepository from "./matching.repository.js";
import * as jobRepository from "../job/job.repository.js";
import pool from "../../config/db.js";

export const runMatching = async (jobId) => {
    const dbClient = await pool.connect();
    try {
        const job = await jobRepository.findJobById(jobId);
        if (!job) return;
        await matchWorkers(dbClient, job);
    } finally {
        dbClient.release();
    }
};

export const matchWorkers = async (dbClient, job) => {
    const workers = await matchingRepository.findEligibleWorkers(dbClient, job);
    let rank = 1;
    for (const worker of workers) {
        await matchingRepository.insertMatch(
            dbClient,
            job.id,
            worker.id,
            rank++,
        );
    }
    return workers;
};
