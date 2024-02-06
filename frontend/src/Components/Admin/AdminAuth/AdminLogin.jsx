import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/Api";
import { AdminSignUp } from "./AdminSignup";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Loading } from "../../UI/Loading";
import { toast } from "react-hot-toast";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const toggleSignUp = () => {
    setSignUp((prevVisibility) => !prevVisibility);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      isLoading(true);
      const data = { Username: username, Password: password };
      const result = await adminLogin(data);
      const { token, message } = result;
      toast.error(message);
      localStorage.setItem("admintoken", token);
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response) {
        setIsError(error.response.data.message);
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Something went wrong");
        setIsError("Something went wrong");
      }
    } finally {
      isLoading(false);
    }
  };
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
    };
    handleLogout();
  }, []);

  if (signUp) {
    return <AdminSignUp toggleSignUp={toggleSignUp} />;
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 rnsit-image"></div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Admin Login</h1>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          method="POST"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              username
            </label>

            <div className="relative">
              <input
                type="username"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <FaUserCircle color="gray" />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <RiLockPasswordFill color="gray" />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="underline text-sm text-gray-500 cursor-pointer hover:text-gray-900"
              onClick={toggleSignUp}
            >
              Sign up
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </div>
          {isError && (
            <p className="text-left text-red-500 text-sm">{isError}</p>
          )}
        </form>
      </div>
    </div>
  );
};
