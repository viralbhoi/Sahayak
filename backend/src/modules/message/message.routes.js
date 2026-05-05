import express from "express";
import * as controller from "./message.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:jobId", protect, controller.getMessages);
router.post("/:jobId", protect, controller.sendMessage);

export default router;
