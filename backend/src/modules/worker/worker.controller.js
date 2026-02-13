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
