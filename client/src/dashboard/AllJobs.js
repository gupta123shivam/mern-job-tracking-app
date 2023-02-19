import React from "react";
import { useGlobalContext } from "../context/AppContext.js";
import { JobsContainer, SearchContainer } from "../dashboard";

const AllJobs = () => {
  const { getJobs } = useGlobalContext();

  React.useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
