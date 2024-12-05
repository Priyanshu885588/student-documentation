import React, { useEffect, useState } from "react";
import { getSingleStudentData } from "./services/Api";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const SingleStudentDetails = ({ id, batch, handleSingleStudent }) => {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();
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
    <div className="flex justify-center flex-col items-center ">
      <div className="bg-cyan-900 text-white py-4 w-screen  top-0">
        <h1 className=" text-3xl font-bold text-center">STUDENT INFORMATION</h1>
      </div>

      {studentData && studentData.data && studentData.data.length > 0 ? (
        <div className="relative overflow-x-auto bg-white ">
          <table className="w-3/4 ml-auto mt-7 mb-10 mr-auto text-sm text-left rtl:text-right text-gray-500  border-l-2 border-r-orange-400 ">
            <tbody>
              {Object.entries(studentData.data[0]).map(([key, value]) => (
                <tr key={key} className="bg-white text-center border-b  ">
                  <td className="px-6 py-4 font-medium bg-white text-black-900 whitespace-nowrap">
                    {key}
                  </td>

                  <td className="px-6 py-4 text-center text-lg font-bold ">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mb-5  ">
            <button
              type="button"
              onClick={handleSingleStudent}
              className="back-button m-5 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
            >
              <IoMdArrowBack />
              Back
            </button>
          </div>
        </div>
      ) : (
        <div class=" p-6 mt-32 flex justify-center flex-col item-center bg-slate-200 text-centers border border-gray-200 rounded-lg shadow">
          <button
            type="button"
            onClick={handleSingleStudent}
            className="w-fit back-button m-5 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
          >
            <IoMdArrowBack />
            Back
          </button>
          <button
            type="button"
            onClick={() =>
              window.open(
                `http://localhost:5173/register?userid=${id}&batch=${batch}`,
                "_blank"
              )
            }
            className="back-button m-5 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
          >
            <IoMdArrowBack className="mr-2" />
            Click here to register your face for authentication
          </button>
        </div>
      )}
    </div>
  );
};
