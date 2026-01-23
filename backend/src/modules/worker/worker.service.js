import AppError from "../../utils/AppError.js";
import * as workerRepository from "./worker.repository.js";

export const createWorker = async (data) => {
    const { phone, city, skills } = data;

    if (!phone || !city) {
        throw new AppError("Phone and city are required", 400);
    }

    if (!Array.isArray(skills) || skills.length === 0) {
        throw new AppError("At least one skill is required", 400);
    }

    const worker = await workerRepository.createWorker(data);
    await workerRepository.assignSkills(worker.id, skills);

    return worker;
};

export const updateAvailability = async (workerId, availability) => {
    if (availability === undefined) {
        throw new AppError("Availability is required", 400);
    }

    const worker = await workerRepository.updateAvailability(
        workerId,
        availability,
    );

    if (!worker) {
        throw new AppError("Worker not found", 404);
    }

    return worker;
};
