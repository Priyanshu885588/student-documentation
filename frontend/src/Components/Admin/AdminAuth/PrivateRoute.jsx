import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/admin" replace />;
};
