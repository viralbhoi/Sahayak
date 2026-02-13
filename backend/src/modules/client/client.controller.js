import * as clientService from "./client.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createClient = asyncHandler(async (req, res) => {
    const client = await clientService.createClient(req.body);
    success(res, client, 201);
});
