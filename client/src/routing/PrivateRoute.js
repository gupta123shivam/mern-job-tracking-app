import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();

  if (!isAuthenticated) {
    return <Navigate to={"/landing"} />;
  }

  return children;
};

export default PrivateRoute;
