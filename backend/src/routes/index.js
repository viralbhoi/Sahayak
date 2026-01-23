import express from "express";
import workerRoutes from "../modules/worker/worker.routes.js";
import clientRoutes from "../modules/client/client.routes.js";
import jobRoutes from "../modules/job/job.routes.js";

const router = express.Router();

router.use("/workers", workerRoutes);
router.use("/clients", clientRoutes);
router.use("/jobs", jobRoutes);

export default router;
