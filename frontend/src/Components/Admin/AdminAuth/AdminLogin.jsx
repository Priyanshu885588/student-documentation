import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/Api"; // Import your API service

import "./AdminLogin.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = { Email: email, Password: password };
      const result = await adminLogin(data);
      const { token, msg } = result;
      localStorage.setItem("token", token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
    };
    handleLogout();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" color="black" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" color="black" />
          </div>
          <button type="submit" className="hover:opacity-65">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
