import {
  createJob,
  getJob,
  getAllJobs,
  showStats,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";
import express from "express";

const jobRouter = express.Router();

jobRouter.route("/").post(createJob).get(getAllJobs);
// place before :id
jobRouter.route("/stats").get(showStats);
jobRouter.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default jobRouter;
