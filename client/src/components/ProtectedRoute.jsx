import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  const userRole = JSON.parse(atob(token.split(".")[1])).role; // Decode JWT to extract user role

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect if the role is not allowed
  }

  return children; // Render the protected component
};

export default ProtectedRoute;