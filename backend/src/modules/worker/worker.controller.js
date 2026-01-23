import * as workerService from "./worker.service.js";

export const createWorker = async (req, res, next) => {
    try {
        const worker = await workerService.createWorker(req.body);
        res.status(201).json(worker);
    } catch (error) {
        next(error);
    }
};

export const updateAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        const worker = await workerService.updateAvailability(id, availability);
        res.status(200).json(worker);
    } catch (error) {
        next(error);
    }
};
