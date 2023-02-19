import React from "react";
import StatsItem from "./StatsItem";
import { useGlobalContext } from "../context/AppContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats, loadSampleData } = useGlobalContext();

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  let sum = 0;
  Object.values(stats).forEach((item) => {
    sum += item;
  });

  return (
    <Wrapper>
      {defaultStats.map((item, index) => (
        <StatsItem key={index} {...item} />
      ))}
      <div className=""></div>
      <button className="btn btn-block" onClick={loadSampleData}>Load Sample Data</button>
    </Wrapper>
  );
};

export default StatsContainer;
