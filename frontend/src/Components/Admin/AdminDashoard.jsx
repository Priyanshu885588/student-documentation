import React, { useEffect, useState } from "react";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";
import { fetchStudentData } from "./services/Api";

export const AdminDashboard = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData({ batch: "2022" });
        setStudentData(data);
      } catch (error) {
        console.error("Error in AdminDashboard", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <VerticalNavbar />
      <div className="w-full h-10 flex justify-center items-center ">
        <p className="montserrat text-xl mt-2 font-medium">Admin Dashboard</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-10 w-full">
        <div className="h-32 w-full bg-white rounded-xl"></div>
        <div className="min-h-60 w-full bg-white rounded-xl">
          {studentData.length > 0 ? (
            <div className="w-full flex justify-center rounded-lg shadow-md">
              <table className="w-full bg-white">
                <thead>
                  <tr className="text-center border-b-2 border-gray-30">
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Admission Category</th>
                    <th className="py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student) => (
                    <tr
                      key={student.id}
                      className="text-center border-b border-gray-30"
                    >
                      <td className="py-2 px-4">{student.id}</td>
                      <td className="py-2 px-4">{student.name}</td>
                      <td className="py-2 px-4">
                        {student.admission_category}
                      </td>
                      <td className="py-2 px-4">Not Submitted</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading student data...</p>
          )}
        </div>
      </div>
    </div>
  );
};
