import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new CustomError.NotFoundError("Job was not found");
  }
  res.status(StatusCodes.OK).json(job);
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).exec();
  if (jobs.length < 1) {
    throw new CustomError.NotFoundError("Jobs were not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new CustomError.BadRequestError("Please provide all the values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send(process.env.NODE_ENV === "development");
};

const showStats = async (req, res) => {
  res.send("stats");
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new CustomError.NotFoundError("Job was not found");
  }

  await job.remove();
  res.status(StatusCodes.OK).json(job);
};

const deleteAllJobs = async (req, res) => {
  const jobs = await Job.deleteMany({});
  res.status(StatusCodes.OK).json(jobs);
};

export {
  createJob,
  getJob,
  getAllJobs,
  showStats,
  deleteJob,
  updateJob,
  deleteAllJobs,
};
