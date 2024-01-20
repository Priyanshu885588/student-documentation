import React from "react";

export const StartingAnimation = () => {
  return (
    <div className="w-screen h-screen relative bg-gradient-to-r from-gray-300 to-gray-100 flex justify-center items-center overflow-hidden">
      <div className="h-24 w-24 rnsit-logo z-50"></div>
      <div className="zoom "></div>
      <div className="upward-move "></div>
    </div>
  );
};
