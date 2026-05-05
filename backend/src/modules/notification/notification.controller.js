import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as notificationRepository from "./notification.repository.js";

export const getNotifications = asyncHandler(async (req, res) => {
    const data = await notificationRepository.getNotifications(req.user.id);
    success(res, data);
});

export const markAsRead = asyncHandler(async (req, res) => {
    await notificationRepository.markAsRead(req.params.id, req.user.id);
    success(res, { message: "Marked as read" });
});
