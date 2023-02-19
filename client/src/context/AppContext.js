import React, { createContext, useContext, useReducer } from "react";
import {
  SHOW_ALERT,
  RESET_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOAD_USER_BEGIN,
  LOAD_USER,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CLEAR_ADD_JOB_FORM,
  HANDLE_FORM_CHANGE,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_JOBS_ERROR,
  SET_EDIT_JOB,
  DELETE_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CHANGE_FILTER,
  CLEAR_FILTER,
} from "./actions";
import appReducer from "./appReducer";
import axios from "axios";

// Persisting the User info in localStorage
const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("location", JSON.stringify(location));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("location");
};

//default value
const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));
const userLocation = JSON.parse(localStorage.getItem("location"));
const isAuthenticated = Boolean(user && token);

// Initial Provider State
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? user : null,
  token: token || "",
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  isAuthenticated: isAuthenticated,
  showSidebar: true,
  // Job States
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  // jobLocation
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  // All Jobs
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  // stats
  stats: {},
  monthlyApplications: [],
  // filtering
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Reducer Function
  const [state, dispatch] = useReducer(appReducer, initialState);

  // axios default
  axios.defaults.headers["Authorization"] = `Bearer ${state.token}`;

  const displayAlert = ({ alertText, alertType }) => {
    dispatch({ type: SHOW_ALERT, payload: { alertText, alertType } });

    setTimeout(() => {
      dispatch({ type: RESET_ALERT });
    }, alert.duration || 5000);
  };

  // Register User
  const registerUser = async (formData) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/auth/register",
        JSON.stringify(formData),
        config
      );

      displayAlert({
        alertType: "success",
        alertText: "User Created! Redirecting...",
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });

      // Saving user, token, location to local storage
      addUserToLocalStorage(res.data);
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg ? error.response.data.msg : "Some error occured"
      }`;
      displayAlert({
        alertType: "danger",
        alertText: msg,
      });
      dispatch({ type: REGISTER_USER_ERROR });
    }
  };

  //Login User
  const loginUser = async (formData) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        JSON.stringify(formData),
        config
      );

      displayAlert({
        alertType: "success",
        alertText: "User Logged In! Redirecting...",
      });

      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });

      // Saving user, token, location to local storage
      addUserToLocalStorage(res.data);
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg
          ? error.response.data.msg
          : "Some error occured while Logging In"
      }`;
      displayAlert({
        alertType: "danger",
        alertText: msg,
      });
      dispatch({ type: LOGIN_USER_ERROR });
    }
  };

  // Logout User
  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
    await axios("api/v1/auth/logout");
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updateUser = async (formData) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/auth/updateUser",
        JSON.stringify(formData),
        config
      );

      displayAlert({
        alertType: "success",
        alertText: "User Data Updated!",
      });

      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });

      // Update user, token, location to local storage
      addUserToLocalStorage(res.data);
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg
          ? error.response.data.msg
          : "Error occcured while updating data"
      }`;
      displayAlert({
        alertType: "danger",
        alertText: msg,
      });

      dispatch({ type: UPDATE_USER_ERROR });
    }
  };

  const loadUser = async () => {
    dispatch({ type: LOAD_USER_BEGIN });

    try {
      const res = await axios.get("/api/v1/auth");

      dispatch({ type: LOAD_USER, payload: res.data });

      // Saving user, token, location to local storage
      addUserToLocalStorage(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
      }
    }
  };

  // ================== JOB =======================
  const createJob = async (formData) => {
    dispatch({ type: CREATE_JOB_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/jobs",
        JSON.stringify(formData),
        config
      );

      displayAlert({
        alertType: "success",
        alertText: "Job Created!",
      });

      dispatch({ type: CREATE_JOB_SUCCESS, payload: res.data });

      clearAddJobForm();
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg
          ? error.response.data.msg
          : "Error occcured while updating data"
      }`;
      displayAlert({
        alertType: "danger",
        alertText: msg,
      });
      dispatch({ type: CREATE_JOB_ERROR });
    }
  };
  const clearAddJobForm = () => {
    dispatch({ type: CLEAR_ADD_JOB_FORM });
  };
  const handleFormChange = (formData) => {
    dispatch({ type: HANDLE_FORM_CHANGE, payload: formData });
  };
  const getJobs = async () => {
    dispatch({ type: GET_JOBS_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const { page, search, searchStatus, searchType, sort } = state;
      const url = `/api/v1/jobs?page=${page}&search=${search}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

      const {
        data: { jobs, totalJobs, numOfPages },
      } = await axios.get(url, config);

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      const msg = `${error.response.status} Error : ${
        error.response.data.msg
          ? error.response.data.msg
          : "Error occcured while fetching jobs"
      }`;
      displayAlert({
        alertType: "danger",
        alertText: msg,
      });
      // logoutUser();
      dispatch({ type: GET_JOBS_ERROR });
    }
  };
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async (formData) => {
    dispatch({ type: EDIT_JOB_BEGIN });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      await axios.patch(
        `/api/v1/jobs/${state.editJobId}`,
        JSON.stringify(formData),
        config
      );

      displayAlert({
        alertType: "success",
        alertText: "Job Edited!",
      });
      clearAddJobForm();
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      const msg = `${error.response.status} Error : ${
        error.response.data.msg
          ? error.response.data.msg
          : "Error occcured while updating data"
      }`;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg },
      });
    }
  };
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB });
    try {
      const red = await axios.delete(`/api/v1/jobs/${jobId}`);

      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await axios("/api/v1/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    dispatch({ type: RESET_ALERT });
  };

  // Filters
  const changeFilter = (filters) => {
    dispatch({ type: CHANGE_FILTER, payload: filters });
    getJobs();
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const loadSampleData = async () => {
    try {
      await axios("/api/v1/jobs/populate");
      showStats();
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        loadUser,
        createJob,
        clearAddJobForm,
        handleFormChange,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        changeFilter,
        clearFilter,
        loadSampleData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
