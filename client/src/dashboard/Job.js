import React from "react";
import moment from "moment";
import JobInfo from "./JobInfo";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";

const Job = (job) => {
  const { setEditJob, deleteJob } = useGlobalContext();
  const { _id, position, company, jobLocation, jobType, createdAt, status } =
    job;
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              onClick={() => setEditJob(_id)}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
