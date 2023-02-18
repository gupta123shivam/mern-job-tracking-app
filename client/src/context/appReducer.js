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
} from "./actions";
import { initialState } from "./AppContext";

// const initialState = {
//   isLoading: false,
//   showAlert: false,
//   alertText: "",
//   alertType: "",
//   user: null,
//   token: null,
//   userLocation: "",
//   jobLocation: "",
//   isAuthenticated: false,
//   showSidebar: false,
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
    case LOGIN_USER_BEGIN:
    case REGISTER_USER_BEGIN: {
      return { ...state, isLoading: true };
    }
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
    default: {
      return state;
    }
  }
}

export default reducer;
