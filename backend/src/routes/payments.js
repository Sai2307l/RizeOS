import { Router } from "express";
import { verifyPayment } from "../controller/payment_controllers.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/verify", authenticate, verifyPayment);

export default router;
