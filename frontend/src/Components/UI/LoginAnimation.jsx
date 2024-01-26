import React from "react";
import Studentlogin from "../Home/Studentlogin"
export const LoginAnimation = () => {
  return (
    <div className="w-full h-full relative flex justify-center  items-center overflow-hidden homepage-bg-light  ">
      
      <div className="  h-28 w-28 flex justify-center items-center rounded-full bg-transparent">
      <div className="h-24 w-24 rnsit-logo rounded-full "></div>
      </div>
      
      
        <Studentlogin />
      
      
      
   
      <div className="zoom-rev  "></div>
      
    </div>
  );
};
