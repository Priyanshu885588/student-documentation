
import React, { useState, useEffect } from "react";
import { StartingAnimation } from "../UI/StartingAnimation";

export const HomePage = () => {
  const [showStartingAnimation, setShowStartingAnimation] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowStartingAnimation(false);
    }, 2555);
    return () => clearTimeout(timeoutId);
  }, []);

  return showStartingAnimation ? (
    <StartingAnimation />
  ) : (
    <div className="w-screen h-screen relative bg-gradient-to-r from-gray-300 to-gray-100 text-3xl">
      Home Page
  </div>
);
};