import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChartPie } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
export const VerticalNavbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="h-fit">
      <div className="">
        <button
          className="bg-white hover:bg-amber-200 rounded-br-2xl py-2 px-2 absolute top-0 transition-all duration-300"
          type="button"
          onClick={toggleDrawer}
        >
          <GiHamburgerMenu size="1.5rem" />
        </button>
      </div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800`}
        tabIndex="-1"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleDrawer}
        >
          <IoClose size="1.5rem" />
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group"
                onClick={toggleDrawer}
              >
                <FaChartPie />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/upload"
                className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group"
                onClick={toggleDrawer}
              >
                <FaUpload />
                <span className="ms-3">Upload</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group w-full"
                onClick={handleLogout}
              >
                <IoLogOutSharp size="1.3rem" />
                <span className="ms-2">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
