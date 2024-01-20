import React, { useEffect, useState } from "react";
import { Loading } from "../UI/Loading";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";
import { fetchStudentBatches, fetchStudentData } from "./services/Api";
import { PiStudentDuotone } from "react-icons/pi";
import { FaAccusoft } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import Pagination from "./Pageination";

export const AdminDashboard = () => {
  const [batch, setBatch] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [studentCount, setStudentCount] = useState({});
  const [batches, setIsbatches] = useState();
  const [pgCount, setpagecount] = useState();

  

  const fetchData = async (batchData) => {
    
    try {
      setIsLoading(true);
      const data = await fetchStudentData({ batch: batchData, page: 1 });
      setStudentData(data.rows);
      setpagecount(data.pagesCount)
      const totalStudents = data.length;
      const submittedStudents = data.rows.reduce((count, student) => {
        return count + (student.status.data[0] === 1 ? 1 : 0);
      }, 0);
      
      setStudentCount({
        totalStudents: totalStudents,
        submittedStudents: submittedStudents,
      });
    } catch (error) {
      console.error("Error in AdminDashboard", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;
    setBatch(selectedBatch);
    fetchData(selectedBatch);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setIsLoading(true);
        const batchesData = await fetchStudentBatches();
        setIsbatches(batchesData);
        // Assuming you want to initially fetch data for the first batch in the list
        if (batchesData.batches.length > 0) {
          setBatch(batchesData.batches[0]);
          fetchData(batchesData.batches[0]);
        } else {
          setIsbatches(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-300 to-gray-100">
      <VerticalNavbar />
      <div className="w-full h-10 flex justify-center items-center ">
        <p className="quicksand text-2xl text-black tracking-widest uppercase mt-2 font-bold">
          Dashboard
        </p>
      </div>
      {batches ? (
        <div className="flex flex-col items-center justify-center gap-6 p-10 w-full">
          <div className="h-32 w-full bg-transparent flex justify-between gap-3">
            <div className="bg-white h-full w-1/4 rounded-xl gap-5 shadow-lg flex justify-center items-center">
              <div className="p-3 bg-blue-100 rounded-full shadow-sm shadow-blue-700">
                <PiStudentDuotone color="#1C64F2" size="2.5rem" />
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
            <div className="bg-white h-full w-1/4 rounded-xl gap-5 shadow-lg flex justify-center items-center">
              <div className="p-3 bg-yellow-100 rounded-full shadow-sm shadow-yellow-700">
                <FaAccusoft color="#F1B300" size="2.5rem" />
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
            <div className="bg-white h-full w-1/4 rounded-xl gap-5 shadow-lg flex justify-center items-center">
              <div className="p-3 bg-green-100 rounded-full shadow-sm shadow-green-700">
                <FaCodeBranch color="#19794D" size="2.5rem" />
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
            <div className="bg-white h-full w-1/4 rounded-xl gap-4 shadow-lg flex justify-center items-center">
              <div className="w-1/2 flex justify-end">
                <div className="p-3 bg-red-100 rounded-full w-fit shadow-sm shadow-red-900">
                  <GrGroup color="red" size="2.5rem" />
                </div>
              </div>
              <div className="w-1/2 overflow-hidden">
                <select
                  onChange={handleBatchChange}
                  value={batch}
                  className="focus:outline-none cursor-pointer uppercase w-fit"
                >
                  {batches &&
                    batches.batches.map((batch) => (
                      <option
                        className="cursor-pointer uppercase"
                        key={batch}
                        value={batch}
                      >
                        {batch}
                      </option>
                    ))}
                </select>



              </div>
            </div>
          </div>

          <div>
                     <Pagination  pageCount={pgCount}  /> 
          </div>

          <div className="min-h-60 w-full bg-white rounded-xl">
            {isError ? (
              <div className="w-full h-60 flex justify-center items-center">
                <p className="text-red-500">Error fetching data.</p>
              </div>
            ) : (
              <div className="w-full flex justify-center rounded-lg shadow-md roboto">
                <table className="w-full bg-white rounded-xl">
                  <thead>
                    <tr className="text-center border-b-2 border-gray-30 uppercase">
                      <th className="py-4 px-4">S_No</th>
                      <th className="py-4 px-4">ID</th>
                      <th className="py-4 px-4">Name</th>
                      <th className="py-4 px-4">Admission Category</th>
                      <th className="py-4 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student, index) => (
                      <tr
                        key={student.id}
                        className="text-center border-b border-gray-30"
                      >
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4 mono">{student.id}</td>
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
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-center text-2xl text-red-500 font-bold uppercase p-10">
          No data
        </div>
      )}
    </div>
  );
};
