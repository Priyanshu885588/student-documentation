import React, { useState, useEffect } from "react";
import { LoginAnimation } from "../UI/LoginAnimation";

export const ThankYou = () => {
  const [showCheckIcon, setShowCheckIcon] = useState(true);
 // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden homepage-bg-light">
      
      
      <div className="absolute z-10 w-96 bg-opacity-60 bg-black border-2 border-blue-400 shadow-lg backdrop-blur-md text-white rounded-lg p-8">
        <h1 className="text-3xl text-center mb-5 mt-11 ">Upload Successful !!</h1>
        <div className="success-checkmark">
          {showCheckIcon && (
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          )}
        </div>
        <h2 className="text-xl text-center mb-5 ">Your details have be Successful uploaded.</h2>
        <div className="grid place-items-center h-full  ">

        <button
          className="text-white mt-5 mb-9 px-10 py-2 border-2 backdrop-blur-3xl roboto text-lg rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300"
          >
          Logout
        </button>
          
     </div>
      </div>
            
     
    </div>
  );
};


