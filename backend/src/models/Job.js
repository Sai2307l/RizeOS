import mongoose, { Types } from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    skills: [String],
    location: String,
    budget: Number,
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "review", "active"],
      default: "draft",
    },
    applicants: [{ type: Types.ObjectId, ref: "User" }],
    paymentTxnHash: String,
    createdBy: String, // attach user ID
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
