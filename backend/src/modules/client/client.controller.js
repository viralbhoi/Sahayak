import * as clientService from "./client.service.js";

export const createClient = async (req, res) => {
    try {
        const client = await clientService.createClient(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
