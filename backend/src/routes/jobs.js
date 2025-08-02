import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  reviewJob,
  confirmPayment,
  applyJob,
} from "../controller/job_controllers.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", authenticate, createJob);
router.put("/:id", authenticate, updateJob);
router.delete("/:id", authenticate, deleteJob);
router.get("/:id/review", reviewJob);
router.post("/:id/confirm-payment", confirmPayment);
router.post("/:id/apply", authenticate, applyJob);

export default router;
