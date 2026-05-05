import express from "express";
import * as notificationController from "./notification.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, notificationController.getNotifications);
router.patch("/:id/read", protect, notificationController.markAsRead);

export default router;
