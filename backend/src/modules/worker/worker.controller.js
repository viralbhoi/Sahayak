import * as workerService from "./worker.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createWorker = asyncHandler(async (req, res, next) => {
    const worker = await workerService.createWorker(req.body);
    success(res, worker, 201);
});

export const updateAvailability = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { availability } = req.body;

    const worker = await workerService.updateAvailability(id, availability);
    success(res, worker, 200);
});

export const getWorkerById = asyncHandler(async (req, res) => {
    const worker = await workerService.getWorkerById(Number(req.params.id));

    success(res, worker);
});

export const updateSkills = asyncHandler(async (req, res) => {
    const worker = await workerService.updateSkills(
        Number(req.params.id),
        req.body.skills,
    );
    success(res, worker);
});

export const updateLocation = asyncHandler(async (req, res) => {
    const { lat, lng } = req.body;

    const workerId = req.user.id;

    const result = await workerService.updateLocation(workerId, lat, lng);

    success(res, result);
});
