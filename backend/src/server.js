import "dotenv/config";
import express from "express";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import paymentRoutes from "./routes/payments.js";
import aiRoutes from "./routes/ai.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
