import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { ChartsContainer, StatsContainer } from "../components";
import Spinner from "../shared_layout/Spinner";

const Stats = () => {
  const { monthlyApplications, isLoading, showStats, jobs } =
    useGlobalContext();

  React.useEffect(() => {
    showStats();
        //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
