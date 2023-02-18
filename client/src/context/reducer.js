import { SHOW_ALERT, RESET_ALERT } from "./actions";

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
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
    default: {
      return state;
    }
  }
}

export default reducer;
