import React from "react";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";

export const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <VerticalNavbar />
      <div className="w-full h-10 flex justify-center items-center ">
        <p className="montserrat text-xl mt-2 font-medium">Admin Dashboard</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-10">
        <div className="h-32 w-full bg-white rounded-xl"></div>
        <div className="min-h-60 w-full bg-white rounded-xl"></div>
      </div>
    </div>
  );
};
