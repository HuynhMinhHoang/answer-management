import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const userRole = useSelector((state) => state.userRedux.user.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <>{props.children}</>;
};

export default AdminRoute;
