import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.token;
  return isAuthenticated ? <Component /> : <Redirect to={{ pathname: "/" }} />;
};

export default ProtectedRoute;
