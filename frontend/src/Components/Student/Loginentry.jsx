import React from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Loginentry = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const batch = searchParams.get("batch");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("studentToken", token);
    navigate(`/detailsForm/${batch}`);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center text-sm text-gray-700 ">
      <div className="animate-pulse rounded-full py-1 px-3 bg-gray-200">
        Processing
      </div>
    </div>
  );
};
