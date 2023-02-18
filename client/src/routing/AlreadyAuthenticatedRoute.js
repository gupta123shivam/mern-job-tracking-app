import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const AlreadyAuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default AlreadyAuthenticatedRoute;
