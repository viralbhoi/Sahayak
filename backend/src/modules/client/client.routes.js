import express from "express";
import * as clientController from "./client.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createClientSchema } from "./client.schema.js";

const router = express.Router();

// Register client
router.post("/", validate(createClientSchema), clientController.createClient);

export default router;
