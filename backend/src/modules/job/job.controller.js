import * as jobService from "./job.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createJob = asyncHandler(async (req, res) => {
    const job = await jobService.createJob(req.body);
    success;
});

export const getMatches = asyncHandler(async (req, res) => {
    const jobId = Number(req.params.id);

    const matches = await jobService.getMatches(jobId, req.user);

    success(res, matches);
});

export const getMyJobs = asyncHandler(async (req, res) => {
    const jobs = await jobService.getMyJobs(req.user.id);
    success(res, jobs);
});