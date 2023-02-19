import {
  SET_SLERT,
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
  LOAD_USER_ERROR,
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
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CHANGE_FILTER,
  CLEAR_FILTER,
} from "./actions";
import { initialState } from "./AppContext";

// const initialState = {
//   isLoading: false,
//   showAlert: false,
//   alertText: "",
//   alertType: "",
//   user: null,
//   token: "",
//   userLocation: "",
//   jobLocation: "",
//   isAuthenticated: false,
//   showSidebar: true,
//   // Job States
//   isEditing: false,
//   editJobId: "",
//   position: "",
//   company: "",
//   // jobLocation
//   jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
//   jobType: "full-time",
//   statusOptions: ["pending", "interview", "declined"],
//   status: "pending",
// };

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SLERT:
    case SHOW_ALERT: {
      return { ...state, ...payload, showAlert: true };
    }
    // Can also only set showAlert to false, because whenever nexr alert is shown
    // alertType and alertText is provided, wich will overwrite previos values
    case RESET_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
    case SHOW_STATS_BEGIN:
    case CREATE_JOB_BEGIN:
    case LOAD_USER_BEGIN:
    case UPDATE_USER_BEGIN:
    case LOGIN_USER_BEGIN:
    case REGISTER_USER_BEGIN: {
      return { ...state, isLoading: true, isEditing: false, showAlert: false };
    }
    case LOAD_USER:
    case UPDATE_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS: {
      const { user, token, location } = payload;
      return {
        ...state,
        isLoading: false,
        user,
        token,
        jobLocation: location,
        userLocation: location,
        isAuthenticated: true,
      };
    }
    case GET_JOBS_ERROR:
    case LOAD_USER_ERROR:
    case UPDATE_USER_ERROR:
    case LOGIN_USER_ERROR:
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGOUT_USER: {
      return initialState;
    }
    case TOGGLE_SIDEBAR: {
      return { ...state, showSidebar: !state.showSidebar };
    }

    // ====================== JOB =========================
    case CHANGE_FILTER:
    case HANDLE_FORM_CHANGE: {
      return { ...state, ...payload };
    }

    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        editJobId: "",
        showAlert: true,
        alertType: "success",
        alertText: `Job ${state.isEditing ? "Edited" : "Created"}!`,
      };
    }
    case CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: payload.msg,
      };
    }
    case CLEAR_ADD_JOB_FORM: {
      return {
        ...state,
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobType: "full-time",
        status: "pending",
      };
    }
    case GET_JOBS_BEGIN: {
      return { ...state, isLoading: true, showAlert: false };
    }
    case SHOW_STATS_SUCCESS:
    case GET_JOBS_SUCCESS: {
      return { ...state, ...payload, isLoading: false };
    }
    case SET_EDIT_JOB: {
      const editJobId = payload.id;
      const { company, position, jobLocation, jobType, status } =
        state.jobs.find((job) => job._id === editJobId);
      return {
        ...state,
        isEditing: true,
        editJobId,
        company,
        position,
        jobLocation,
        jobType,
        status,
      };
    }
    case EDIT_JOB_BEGIN: {
      return { ...state, isLoading: true, isEditing: true };
    }
    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isEditing: false,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job Updated!",
      };
    }
    case EDIT_JOB_ERROR: {
      return {
        ...state,
        isEditing: false,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case DELETE_JOB: {
      return {
        ...state,
        // isLoading: true,
      };
    }
    case CLEAR_FILTER: {
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
