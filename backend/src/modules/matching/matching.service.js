import * as matchingRepository from "./matching.repository.js";

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
