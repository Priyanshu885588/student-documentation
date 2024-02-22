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
    <div className="bg-slate-500" >
      <div className="bg-cyan-900 relative text-white py-4">
        
        
        <h1 className=" text-3xl font-bold text-center">STUDENT INFORMATION</h1>
      </div>
      
      

      {studentData && studentData.data && studentData.data.length > 0 && (
        <div className="relative overflow-x-auto bg-slate-500 ">
        <table className="w-3/4 ml-auto mt-7 mb-10 mr-auto text-sm text-left rtl:text-right text-gray-500  border-l-2 border-r-orange-400 ">
        
            <tbody>
                {Object.entries(studentData.data[0]).map(([key, value]) => (
                    <tr key={key} class="bg-white text-center border-b  ">
                        <td class="px-6 py-4 font-medium bg-white text-black-900 whitespace-nowrap">
                            {key}
                        </td>
                        
                        <td class="px-6 py-4 text-center text-lg font-bold ">
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
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
    Back
  </button>
  <button 
    type="button" 
    
    className="delete-button m-5 flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
  >
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    Delete
  </button>
</div>
    </div>
      )}
    </div>
  );
};
