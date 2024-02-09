import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { verificationAdmin } from "../services/Api";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { adminSignUp } from "../services/Api";
import { Loading } from "../../UI/Loading";

export const AdminSignUp = ({ toggleSignUp }) => {
  const [verification, setVerification] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [loading, isLoading] = useState(false);
  const [Code, setCode] = useState(null);
  const [InputCode, setInputCode] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("admintoken");
    };
    handleLogout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verification) {
      try {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        setCode(randomNumber);
        setVerificationLoading(true);
        const data = await verificationAdmin({
          username,
          verificationCode: randomNumber,
        });
        setVerificationLoading(false);
        toast.success(data.message);
      } catch (error) {
        toast.error("Error in sending code");
        setCode(null);
        setVerificationLoading(false);
      }
    } else {
      try {
        isLoading(true);
        const data = await adminSignUp({
          Username: username,
          Password: password,
        });
        const { token, message } = data;
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setIsError(error.response.data.message);
          // Display the error message or handle it as needed
        } else if (error.request) {
          // The request was made but no response was received
          setIsError("No response received");
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          setIsError("Request setup error:");
          console.error("Request setup error:", error.message);
        }
      } finally {
        isLoading(false);
      }
    }
  };

  const handleVerification = () => {
    if (Code == InputCode) {
      setVerification(true);
    } else {
      toast.error("not verified");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap lg:h-screen lg:items-center">
      <Toaster />
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 rnsit-image"></div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Admin Sign Up</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <FaUserCircle color="gray" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Enter the verification code
            </label>

            <div className="relative">
              <input
                type={verification ? "password" : "text"}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter the verification code"
                value={InputCode}
                onChange={(e) => setInputCode(e.target.value)}
                disabled={!Code || verification}
              />
              {verificationLoading && (
                <span className=" absolute inset-y-0 end-0 grid place-content-center px-4 animate-spin">
                  <FaSpinner color="gray" />
                </span>
              )}
              {verification && (
                <span className=" absolute inset-y-0 end-0 grid place-content-center px-4">
                  <IoCheckmarkDone color="green" />
                </span>
              )}
              {!verificationLoading && Code && !verification && (
                <span
                  onClick={handleVerification}
                  className=" roboto bg-gray-900 rounded-lg absolute inset-y-3 cursor-pointer text-sm text-white py-1 end-1 h-fit px-4 hover:bg-gray-700"
                >
                  Verify
                </span>
              )}
            </div>
          </div>
          {verification && (
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
          )}

          <div className="flex items-center justify-between">
            <span
              className="underline text-sm text-gray-500 pl-2 cursor-pointer hover:text-gray-900"
              onClick={toggleSignUp}
            >
              ↜ Sign in
            </span>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              {verification ? "Sign up" : "Send verification code to admin"}
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
