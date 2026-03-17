import * as jobService from "./job.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createJob = asyncHandler(async (req, res) => {
    const result = await jobService.createJob(req.body, req.user.id);
    success(res, result);
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

export const getWorkerFeed = asyncHandler(async (req, res) => {
    const jobs = await jobService.getWorkerFeed(req.user.id);
    success(res, jobs);
});

export const acceptJob = asyncHandler(async (req, res) => {
    await jobService.acceptJob(Number(req.params.id), req.user.id);
    success(res, { message: "Job accepted" });
});

export const startJob = asyncHandler(async (req, res) => {
    await jobService.startJob(Number(req.params.id), req.user.id);
    success(res, { message: "Job started" });
});

export const completeJob = asyncHandler(async (req, res) => {
    await jobService.completeJob(Number(req.params.id), req.user.id);
    success(res, { message: "Job completed" });
});
