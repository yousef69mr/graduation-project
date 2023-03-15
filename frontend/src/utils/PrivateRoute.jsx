import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/login_signup" />
  );
};

export default PrivateRoute;
