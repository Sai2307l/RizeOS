import Job from "../models/Job.js";
import { Types } from "mongoose";
export const getJobs = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.skills) {
      filters.skills = { $in: req.query.skills.split(",") };
    }
    if (req.query.minBudget) {
      filters.budget = { $gte: Number(req.query.minBudget) };
    }
    const jobs = await Job.find(filters);
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = new Job({ ...req.body, status: "draft" });
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const reviewJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send("Not found");
    res.json(job);
  } catch (err) {
    next(err);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const { txnHash } = req.body;
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      {
        status: "active",
        paymentTxnHash: txnHash,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    next(err);
  }
};

export const getJobsAppliedByUser = async (req, res, next) => {
  try {
    const jobs = await Job.find({
      applicants: new Types.ObjectId(req.user.id),
    });

    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants?.includes(req.user.id)) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.applicants = job.applicants || [];
    job.applicants.push(req.user.id);
    await job.save();

    res.json({ message: "Applied successfully" });
  } catch (err) {
    next(err);
  }
};
