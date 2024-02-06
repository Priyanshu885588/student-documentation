import React, { useState, useEffect } from "react";
import { StartingAnimation } from "../UI/StartingAnimation";
import Studentlogin from "../Student/Studentlogin";
import { LoginAnimation } from "../UI/loginanimation";

export const HomePage = () => {
  const [showStartingAnimation, setShowStartingAnimation] = useState(true);
  const [studentlogin, setstudentlogin] = useState(false);
  const loginbuttonclick = () => {
    setstudentlogin(true);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowStartingAnimation(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return showStartingAnimation ? (
    <StartingAnimation />
  ) : (
    <div className="w-screen h-screen flex justify-between items-center flex-col overflow-hidden homepage-bg">
      <div className="flex flex-col justify-center items-center gap-4 mt-7">
        <h1 className="text-white text-5xl text-center montserrat mb-4 z-10">
          Student Documents upload portal
        </h1>
        <h1 className="text-white text-2xl uppercase quicksand z-10">
          RNS Institute of Technology
        </h1>
        <p className="w-2/3 text-white merriweather italic text-center text-sm opacity-75 font-extralight z-10">
          "to impart quality education to enable graduates to excel in their
          career"
        </p>
      </div>
      <div className="absolute bottom-[40%] h-28 w-28 flex justify-center items-center rounded-full bg-orange-500">
        <div className="h-24 w-24 rnsit-logo "></div>
      </div>
      <div className="absolute justify-center items-center w-screen h-screen">
        {studentlogin && <LoginAnimation />}
      </div>
      <div className="mb-10">
        <button
          className="text-white px-10 py-2 border-2 backdrop-blur-3xl roboto text-lg rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300"
          onClick={loginbuttonclick}
        >
          Login
        </button>
      </div>
    </div>
  );
};
