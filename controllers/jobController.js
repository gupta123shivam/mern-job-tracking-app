const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  res.send(`job ${jobId}`);
};

const getAllJobs = async (req, res) => {
  res.send("all job");
};

const createJob = async (req, res) => {
  res.send("create");
};

const updateJob = async (req, res) => {
  res.send(process.env.NODE_ENV === "development");
};

const showStats = async (req, res) => {
  res.send("stats");
};
const deleteJob = async (req, res) => {
  res.send("delete");
};

export { createJob, getJob, getAllJobs, showStats, deleteJob, updateJob };
