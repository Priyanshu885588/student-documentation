import React from "react";

export const StartingAnimation = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden homepage-bg-light">
      <div className="  h-28 w-28 flex justify-center items-center rounded-full bg-black">
      <div className="h-24 w-24 rnsit-logo rounded-full z-50"></div>
      </div>
      <div className="zoom "></div>
      <div className="upward-move "></div>
    </div>
  );
};
