import React from "react";
import { useGlobalContext } from "../context/AppContext.js";
import Spinner from "../shared_layout/Spinner.js";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer.js";

const JobsContainer = () => {
  const { getJobs, isLoading, jobs, numOfPages, page } = useGlobalContext();

  React.useEffect(() => {
    getJobs();
    //eslint-disable-next-line
  }, [page]);

  if (isLoading) {
    return <Spinner />;
  }

  if (jobs.length < 1) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {numOfPages > 1 && <PageBtnContainer />}
      <h4>
        {jobs.length} job{jobs.length > 1 ? "s" : null} found
      </h4>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job {...job} key={job._id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
