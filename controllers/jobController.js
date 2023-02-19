import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
// Populating Smaplre Data
import { readFile } from "fs/promises";

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new CustomError.NotFoundError("Job was not found");
  }
  res.status(StatusCodes.OK).json(job);
};

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status !== "all") {
    queryObject.status = status;
  }
  if (jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // Get the promise and await for it later
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //Pagination by skipping and limiting the results
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10

  result = result.skip(skip).limit(limit);

  // Setting up the pagination
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  const jobs = await result;
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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
  const { company, position } = req.body;
  const { id: jobId } = req.params;

  if (!company || !position) {
    throw new CustomError.BadRequestError("Please provide all the values");
  }
  const foundJob = await Job.findOne({ _id: jobId });
  if (!foundJob) {
    throw new CustomError.NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, foundJob.createdBy);
  const job = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(job);
};

const showStats = async (req, res) => {
  // Grounping by status
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // Aggregate Jobs Based on Year and Month
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  // Formating Dates
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const foundJob = await Job.findOne({ _id: jobId });
  if (!foundJob) {
    throw new CustomError.NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, foundJob.createdBy);
  await foundJob.remove();

  res.status(StatusCodes.OK).json(foundJob);
};

const deleteAllJobs = async (req, res) => {
  // const jobs = await Job.deleteMany({});
  // res.status(StatusCodes.OK).json(jobs);
  res.send("");
};

// Populating sample data
const populate = async (req, res, next) => {
  try {
    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("../mock-data.json", import.meta.url))
    );

    const newjsonProducts = jsonProducts.map((product) => {
      return { ...product, createdBy: req.user.userId };
    });

    await Job.create(newjsonProducts);
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Success! Sample data loaded." });
  } catch (error) {
    nextTick(error);
  }
};

export {
  createJob,
  getJob,
  getAllJobs,
  showStats,
  deleteJob,
  updateJob,
  deleteAllJobs,
  populate,
};
