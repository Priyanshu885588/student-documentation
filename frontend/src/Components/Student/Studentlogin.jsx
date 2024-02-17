import React, { useState, useEffect } from "react";
import { LoginAnimation } from "../UI/loginanimation";
import { studentLogin } from "./Services/Services";
import { useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { fetchStudentBatches } from "../Admin/services/Api";

export const Login = () => {
  const [username, setusername] = useState("");
  const [uniqueid, setUniqueid] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const navigate = useNavigate();
  const [batches, setIsbatches] = useState("");

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await studentLogin({ uniqueid, name: username }, batch);
      localStorage.setItem("studentToken", data.token);
      navigate("/detailsForm");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setIsError(error.response.data.msg);
      } else {
        console.error("Internal server error");
        setIsError("Internal server error");
      }
    }
  };

  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;
    setBatch(selectedBatch);
  };

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("studentToken");
    };
    handleLogout();
    const fetchBatches = async () => {
      try {
        setIsLoading(true);
        const batchesData = await fetchStudentBatches();
        setIsbatches(batchesData);
        if (batchesData.batches.length > 0) {
          setBatch(batchesData.batches[0]);
        } else {
          setIsbatches(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, []);

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
          <select
            onChange={handleBatchChange}
            value={batch}
            required
            className="w-full h-full bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:text-white"
          >
            {batches &&
              batches.batches.map((batch) => (
                <option
                  className="cursor-pointer uppercase text-black"
                  key={batch}
                  value={batch}
                >
                  {batch}
                </option>
              ))}
          </select>
          <MdDateRange className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-white text-black border-2 outline-none rounded-full shadow-sm cursor-pointer text-base font-semibold transition duration-300 ease-in-out hover:bg-transparent hover:text-white"
        >
          Login
        </button>
        {isError && (
          <div className="flex justify-center items-center mt-5">
            <p className="text-red-400 opacity-80 text-sm">{isError}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
