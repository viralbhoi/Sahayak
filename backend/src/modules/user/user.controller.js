import * as userService from "./user.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
    const user = await userService.getProfile(req.user.userId);

    success(res, user);
});

export const updateProfile = asyncHandler(async (req, res) => {
    const user = await userService.updateProfile(req.user.userId, req.body);

    success(res, user);
});

export const getPublicProfile = asyncHandler(async (req, res) => {
    const user = await userService.getPublicProfile(req.params.id);

    success(res, user);
});
