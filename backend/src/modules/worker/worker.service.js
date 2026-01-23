import * as workerRepository from "./worker.repository.js";

export const createWorker = async (data) => {
    const { name, phone, city, area, skills } = data;

    // Validation (business-level)
    if (!phone || !city) {
        throw new Error("Phone and city are required");
    }

    if (!Array.isArray(skills) || skills.length === 0) {
        throw new Error("At least one skill is required");
    }

    // Create worker
    const worker = await workerRepository.createWorker({
        name,
        phone,
        city,
        area,
    });

    // Assign skills
    await workerRepository.assignSkills(worker.id, skills);

    return worker;
};

export const updateAvailability = async (workerId, availability) => {
    if (availability === undefined) {
        throw new Error("Availability value is required");
    }

    const updatedWorker = await workerRepository.updateAvailability(
        workerId,
        availability
    );

    if (!updatedWorker) {
        throw new Error("Worker not found");
    }

    return updatedWorker;
};
