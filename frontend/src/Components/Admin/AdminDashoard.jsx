import React, { useEffect, useState } from "react";
import { Loading } from "../UI/Loading";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";
import { fetchStudentData } from "./services/Api";
import { PiStudentDuotone } from "react-icons/pi";

export const AdminDashboard = () => {
  const [isError, setIsError] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentCount, setStudentCount] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData({ batch: "2022" });
        setStudentData(data);
        const totalStudents = data.length;
        const submittedStudents = data.reduce((count, student) => {
          return count + (student.status.data[0] === 1 ? 1 : 0);
        }, 0);

        setStudentCount({
          totalStudents: totalStudents,
          submittedStudents: submittedStudents,
        });
      } catch (error) {
        console.error("Error in AdminDashboard", error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <VerticalNavbar />
      <div className="w-full h-10 flex justify-center items-center ">
        <p className="montserrat text-xl mt-2 font-medium">Admin Dashboard</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-10 w-full">
        <div className="h-32 w-full bg-transparent flex justify-between gap-3">
          <div className="bg-white h-full w-1/4 rounded-xl gap-5 shadow-lg flex justify-center items-center">
            <div className="p-2 bg-blue-100 rounded-full shadow-lg shadow-blue-900">
              <PiStudentDuotone color="#1C64F2" size="3rem" />
            </div>
            <div>
              <p className="text-lg font-bold roboto">
                {studentCount.submittedStudents}{" "}
                <span className="text-sm font-medium robot text-gray-500">
                  / {studentCount.totalStudents}
                </span>
              </p>
              <p className="text-xs nunito opacity-75 text-gray-500">
                Total submitted
              </p>
            </div>
          </div>
          <div className="bg-white h-full w-1/4 rounded-xl shadow-lg"></div>
          <div className="bg-white h-full w-1/4 rounded-xl shadow-lg"></div>
          <div className="bg-white h-full w-1/4 rounded-xl shadow-lg"></div>
        </div>
        <div className="min-h-60 w-full bg-white rounded-xl">
          {isError ? (
            <div className="w-full h-60 flex justify-center items-center">
              <p className="text-red-500">Error fetching data.</p>
            </div>
          ) : studentData.length > 0 ? (
            <div className="w-full flex justify-center rounded-lg shadow-md roboto">
              <table className="w-full bg-white rounded-xl">
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
                      {student.status.data[0] ? (
                        <td className="py-2 px-4 flex justify-center items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          Done
                        </td>
                      ) : (
                        <td className="py-2 px-4 flex justify-center items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          Pending
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full h-60 flex justify-center items-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
