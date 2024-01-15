import React from "react";
import { Link } from "react-router-dom";
import './AdminLogin.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

export const AdminLogin = () => {
  return (<>
       <div className='wrapper'>
        <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon"/>
          
        </div><button type="submit">Login</button></form>
         <div><button action='' >Sign up </button></div> 
         {/*need 'AdminSignup' for signup */}

       
       </div>
       
  
  </>);

  
      

  


  
};
