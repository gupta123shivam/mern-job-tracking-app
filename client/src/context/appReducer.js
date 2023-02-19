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
} from "./actions";
// import { initialState } from "./AppContext";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: "",
  userLocation: "",
  jobLocation: "",
  isAuthenticated: false,
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
};

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
    case CREATE_JOB_BEGIN:
    case LOAD_USER_BEGIN:
    case UPDATE_USER_BEGIN:
    case LOGIN_USER_BEGIN:
    case REGISTER_USER_BEGIN: {
      return { ...state, isLoading: true };
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
    case HANDLE_FORM_CHANGE: {
      return { ...state, ...payload, isEditing: true };
    }
    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Created!",
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
    case GET_JOBS_SUCCESS: {
      return { ...state, ...payload };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
