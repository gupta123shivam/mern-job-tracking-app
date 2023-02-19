import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { useGlobalContext } from "../context/AppContext";
import { Alert, FormRow, FormRowSelect } from "../components";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    company,
    position,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    createJob,
    clearAddJobForm,handleFormChange
  } = useGlobalContext();

  function handleChange(e) {
    handleFormChange({ [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !jobLocation) {
      displayAlert({
        alertText: "Please fil first 3 fields",
        alertType: "danger",
      });
      return;
    }

    createJob({company, position, jobLocation, status, jobType});
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChange}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChange}
            list={statusOptions}
          />

          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleChange}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={onSubmit}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                clearAddJobForm();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
