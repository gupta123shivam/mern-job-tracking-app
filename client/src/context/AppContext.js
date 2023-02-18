import React, { createContext, useContext, useReducer } from "react";
import { SHOW_ALERT, RESET_ALERT } from "./actions";
import reducer from "./reducer";

// Initial Provider State
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Reducer Function
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (alert) => {
    dispatch({ type: SHOW_ALERT, payload: alert });

    setTimeout(() => {
      dispatch({ type: RESET_ALERT });
    }, alert.duration || 5000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
