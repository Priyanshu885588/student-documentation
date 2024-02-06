import React, { useState, useEffect } from "react";
import { LoginAnimation } from "../UI/loginanimation";
import { studentLogin } from "./Services/Services";
import { useNavigate } from "react-router-dom";

import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

export const Login = () => {
  const [username, setusername] = useState("");
  const [uniqueid, setUniqueid] = useState("");
  const [batch, setBatch] = useState("");
  const navigate = useNavigate();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await studentLogin({ uniqueid, name: username }, batch);
      localStorage.setItem("studentToken", data.token);
      navigate("/detailsForm");
    } catch (error) {
      console.log("error occured");
    }
  };
  return (
    <div className="login_box">
      <form onSubmit={handleStudentLogin}>
        <h1 className="text-3xl text-center">Login</h1>
        <div className="relative w-full h-16 my-8">
          <input
            type="text"
            className="w-full h-full  bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:text-white "
            id="username"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value.trim())}
            required
          />
          <HiOutlineUserCircle className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
        </div>
        <div className="relative w-full h-16 my-8">
          <input
            type="text"
            className="w-full h-full bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:text-white"
            id="Unique ID"
            placeholder="Unique ID"
            onChange={(e) => setUniqueid(e.target.value.trim())}
            required
          />
          <FaRegAddressCard className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
        </div>
        <div className="relative w-full h-16 my-8">
          <input
            type="text"
            className="w-full h-full bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:text-white"
            id="batch"
            placeholder="Admission year"
            required
            onChange={(e) => setBatch(e.target.value.trim())}
          />
          <FaRegAddressCard className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-white text-black border-2 outline-none rounded-full shadow-sm cursor-pointer text-base font-semibold transition duration-300 ease-in-out hover:bg-transparent hover:text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
