import React from "react";
import { FormRow, FormRowSelect } from "../components";
import { useGlobalContext } from "../context/AppContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search: a,
    searchStatus: b,
    searchType: c,
    sort: d,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    changeFilter,
    clearFilter,
  } = useGlobalContext();
  const [filters, setfilters] = React.useState({
    search: a,
    searchStatus: b,
    searchType: c,
    sort: d,
  });
  const { search, searchStatus, searchType, sort } = filters;

  const handleChange = (e) => {
    setfilters({ ...filters, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeFilter(filters);
  };

  // clears from local state
  const clearForm = () => {
    setfilters({
      search: a,
      searchStatus: b,
      searchType: c,
      sort: d,
    });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleChange}
          ></FormRow>
          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleChange}
            list={["all", ...statusOptions]}
          ></FormRowSelect>
          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            name="searchType"
            value={searchType}
            handleChange={handleChange}
            list={["all", ...jobTypeOptions]}
          ></FormRowSelect>
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleChange}
            list={sortOptions}
          ></FormRowSelect>
          <button
            className="btn btn-block"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => {
              clearForm();
              clearFilter();
            }}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
