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
 
  
    const [divStyles, setDivStyles] = useState("");
  
    const changeDivStyle = (divId) => {
      setDivStyles((prevStyles) => ({
        ...prevStyles,
        [divId]: {
          color:'red'
        },
      }));
    };
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

  const [styles, setStyles] = useState("");
  const LoginButton = () => {
    
    setStyles({
      log: { left: '-400px' },
      reg: { left: '50px' },
      button: { left: '110px' },
    });
    
 }; 
 const Signupbutton=()=>{
  
  setStyles({
    log: { left: '50px' },
    reg: { left: '450px' },
    button: { left: '0' },
  });
 };
  

  return (
    <div className='wrapper'>
    <div className="form-box" >
      <div className="button-box">
        <div id="btn" style={styles.button}></div>
        <button type="button" className="toggle-btn  " onClick={Signupbutton}>Login</button>
        <button type="button" className="toggle-btn" onClick={LoginButton}>Signup</button>

        </div>
        <form id="login" style={styles.log} className="input-group">
          <input type="text" className="input-field" placeholder="Email" required />
          <input type="password" className="input-field" placeholder="Password" required />
          <button type="submit" className="submit-btn">LOGIN</button>
        </form>
        <form id="Signup" style={styles.reg} className="input-group">
          <input type="text" className="input-field" placeholder="userID" required />
          <input type="email" className="input-field" placeholder="EmailID" required />
          <input type="password" className="input-field" placeholder="Password" required />
          <button type="submit" className="submit-btn">Log in</button>
        </form>
      
    </div>
    
    </div>
  );
};
