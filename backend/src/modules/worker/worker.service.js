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

    const normalizedSkills = skills
        .map((s) => String(s).trim().toLowerCase())
        .filter(Boolean);

    const worker = await workerRepository.createWorker({
        ...data,
        skills: normalizedSkills,
    });

    return worker;
};

export const updateAvailability = async (workerId, availability) => {
    if (availability === undefined) {
        throw new AppError("Availability is required", 400);
    }

    if (typeof availability !== "boolean") {
        throw new AppError("Availability must be boolean", 400);
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

export const getWorkerById = async (id) => {
    const worker = await workerRepository.findById(id);

    if (!worker) {
        throw new AppError("Worker not found", 404);
    }

    return worker;
};

export const updateSkills = async (workerId, skills) => {
    if (!Array.isArray(skills))
        throw new AppError("Skills must be an array", 400);

    const normalizedSkills = skills
        .map((s) => String(s).trim().toLowerCase())
        .filter(Boolean);
    return await workerRepository.updateSkills(workerId, normalizedSkills);
};

export const updateLocation = async (workerId, lat, lng) => {
    if (lat == null || lng == null) {
        throw new AppError("Location required", 400);
    }

    const worker = await workerRepository.updateLocation(workerId, lat, lng);

    if (!worker) {
        throw new AppError("Worker not found", 404);
    }

    return worker;
};