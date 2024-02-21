import React, { useEffect, useState } from "react";
import { getSingleStudentData } from "./services/Api";
import { IoArrowBackCircle } from "react-icons/io5";
export const SingleStudentDetails = ({ id, batch, handleSingleStudent }) => {
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleStudentData(batch, id);
        if (data) {
          setStudentData(data);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="text-center quicksand text-3xl font-extrabold p-2">
        Student Details
      </h2>
      <button onClick={handleSingleStudent} className="absolute top-1 left-1">
        <IoArrowBackCircle size="2rem" />
      </button>
      <div className="flex justify-center items-center">
        {studentData && studentData.data && studentData.data.length > 0 && (
          <table className="w-1/2 text-sm text-left rtl:text-right text-gray-900">
            <tbody>
              {Object.entries(studentData.data[0]).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-400">
                  <td className="px-6 py-4 bg-gray-50 ">{key} </td>
                  <td className="px-6 py-4 bg-gray-50 ">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
