import React from "react";
import Studentlogin from "../Student/Studentlogin";
export const LoginAnimation = () => {
  return (
    <div className="w-full h-full relative flex justify-center  items-center overflow-hidden homepage-bg-light  ">
      <div className="  h-28 w-28 flex justify-center items-center rounded-full bg-current"></div>

      <Studentlogin />
    </div>
  );
};
