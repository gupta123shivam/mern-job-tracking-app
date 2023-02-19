import React from "react";
import { useGlobalContext } from "../context/AppContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = React.useState(true);
  const { monthlyApplications: data } = useGlobalContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
