import * as jobService from "./job.service.js";

export const createJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMatches = async (req, res) => {
    try {
        const { id } = req.params;
        const matches = await jobService.getMatches(id);
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
