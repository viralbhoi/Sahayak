import express from "express";
import workerRoutes from "../modules/worker/worker.routes.js";
import clientRoutes from "../modules/client/client.routes.js";
import jobRoutes from "../modules/job/job.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";

const router = express.Router();

router.use("/workers", workerRoutes);
router.use("/clients", clientRoutes);
router.use("/jobs", jobRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/notifications", notificationRoutes);

export default router;
