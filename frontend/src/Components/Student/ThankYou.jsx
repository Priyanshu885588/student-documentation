import React from "react";

export const ThankYou = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="text-7xl playfair flex items-end justify-center gap-4">
        <span>ThankY</span>
        <div className="animate-spin">
          <div className="h-7 w-7 border-2 rounded-full bg-blue-700 animate-pulse"></div>
          <div className="h-7 w-7 border-2 rounded-full bg-orange-500"></div>
        </div>
        <span>u</span>
      </div>
    </div>
  );
};
