import {
  createJob,
  getJob,
  getAllJobs,
  showStats,
  deleteJob,
  updateJob,
  deleteAllJobs,
} from "../controllers/jobController.js";
import express from "express";
import auth from "../middleware/auth.js";

const jobRouter = express.Router();

jobRouter
  .route("/")
  .post(auth, createJob)
  .get(auth, getAllJobs)
  .delete(deleteAllJobs);
// place before :id
jobRouter.route("/stats").get(auth, showStats);
jobRouter
  .route("/:id")
  .get(auth, getJob)
  .delete(auth, deleteJob)
  .patch(auth, updateJob);

export default jobRouter;
