import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  getProfile,
  updateProfile,
} from "../controller/auth_controllers.js";
import { getJobsAppliedByUser } from "../controller/job_controllers.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.get("/applied", authenticate, getJobsAppliedByUser);
export default router;
