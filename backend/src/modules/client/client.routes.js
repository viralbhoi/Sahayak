import express from "express";
import * as clientController from "./client.controller.js";

const router = express.Router();

// Register client
router.post("/", clientController.createClient);

export default router;
