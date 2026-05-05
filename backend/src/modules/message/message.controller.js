import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as service from "./message.service.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;

    const result = await service.sendMessage(
        Number(req.params.jobId),
        req.user,
        message,
    );

    success(res, result);
});

export const getMessages = asyncHandler(async (req, res) => {
    const data = await service.getMessages(Number(req.params.jobId));
    success(res, data);
});
