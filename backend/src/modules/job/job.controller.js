import * as jobService from "./job.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createJob = asyncHandler(async (req, res) => {
    const job = await jobService.createJob(req.body);
    success;
});

export const getMatches = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const matches = await jobService.getMatches(id);
    success(res, matches, 200);
});
