import express from "express";
import upload from "../middleware/pdfUpload.js";
import { processResume } from "../controller/ai_controllers.js";

const router = express.Router();

router.post("/", upload, processResume);

export default router;
