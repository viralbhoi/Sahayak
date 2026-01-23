import express from "express";
import workerRoutes from "../modules/worker/worker.routes.js";

const router = express.Router();

router.use("/workers", workerRoutes);

export default router;
