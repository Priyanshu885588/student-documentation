import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AdminDashboard } from "./AdminDashoard";
import { AdminLogin } from "./AdminAuth/AdminLogin";
import { AdminUpload } from "./AdminUpload";
export const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/upload" element={<AdminUpload />} />
      </Routes>
    </>
  );
};
