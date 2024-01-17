import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export const AdminSignUp = ({ toggleSignUp }) => {
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
    };
    handleLogout();
  }, []);

  return (
    <div className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 rnsit-image"></div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Admin Sign Up</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdEmail color="gray" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <RiLockPasswordFill color="gray" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              alerady have an account?
              <span
                className="underline text-sm text-gray-500 pl-2 cursor-pointer hover:text-gray-900"
                onClick={toggleSignUp}
              >
                Sign in
              </span>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};