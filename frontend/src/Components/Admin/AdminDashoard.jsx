import React, { useEffect, useState } from "react";
import { Loading } from "../UI/Loading";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";
import {
  downloadExcel,
  fetchStudentBatches,
  fetchStudentData,
} from "./services/Api";
import { PiStudentDuotone } from "react-icons/pi";
import { FaAccusoft } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrGroup } from "react-icons/gr";
import Pagination from "./Pageination";
import { useNavigate } from "react-router-dom";
import { SingleStudentDetails } from "./SingleStudentDetails";
import { IoDocumentAttachOutline } from "react-icons/io5";
export const AdminDashboard = () => {
  const [batch, setBatch] = useState("");
  const [id, setId] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [studentCount, setStudentCount] = useState({});
  const [batches, setIsbatches] = useState();
  const [pgCount, setpagecount] = useState();
  const [page, setPage] = useState();
  const [addNewDocumentField, setAddNewDocumentField] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (batchData, currentPage) => {
    try {
      setIsLoading(true);
      const data = await fetchStudentData({
        batch: batchData,
        page: currentPage,
      });
      setPage(currentPage - 1);
      setStudentData(data.rows);
      setpagecount(data.pagesCount);
      setStudentCount({
        totalStudents: data.countValue,
        submittedStudents: data.statusCount,
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
    fetchData(selectedBatch, 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can also use 'auto' for instant scrolling
    });
    const fetchBatches = async () => {
      try {
        setIsLoading(true);
        const batchesData = await fetchStudentBatches();
        setIsbatches(batchesData);
        // Assuming you want to initially fetch data for the first batch in the list
        if (batchesData.batches.length > 0) {
          setBatch(batchesData.batches[0]);
          fetchData(batchesData.batches[0], 1);
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

  const handleSingleStudent = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can also use 'auto' for instant scrolling
    });
    setId(null);
  };

  const handleDownloadExcel = () => {
    downloadExcel(batch);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (id) {
    return (
      <SingleStudentDetails
        id={id}
        batch={batch}
        handleSingleStudent={handleSingleStudent}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-300 to-gray-100">
      {addNewDocumentField && (
        <>
          <div
            className="h-[100vh] w-screen fixed top-0 flex justify-end z-50 bg-black/[0.6]"
            onClick={() => setAddNewDocumentField((prev) => !prev)}
          ></div>
          <div className=" h-screen w-[40vw] bg-white flex justify-center z-[80] items-center shadow-2xl background-corner fixed right-0">
            <div className="w-2/3 h-1/2 rounded-2xl">
              <form
                action=""
                className="flex items-start gap-9 justify-center flex-col w-full"
              >
                <div className="w-full">
                  {" "}
                  <label
                    for="Add_Documents"
                    class="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Enter Document Name
                  </label>
                  <input
                    type="text"
                    id="Add_Documents"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    placeholder="Type new document name"
                  />
                </div>
                <div className="w-full">
                  <label
                    for="document-type"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Select Document type
                  </label>
                  <select
                    id="document-type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Choose a type</option>
                    <option value="US">image</option>
                    <option value="CA">pdf</option>
                  </select>
                </div>
                <input
                  type="submit"
                  placeholder="Submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
                />
              </form>
            </div>
          </div>
        </>
      )}
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
                <IoDocumentAttachOutline color="#F1B300" size="2.5rem" />
              </div>
              <div
                className="nunito opacity-75 text-gray-500 text-sm cursor-pointer"
                onClick={() => setAddNewDocumentField((prev) => !prev)}
              >
                <p>
                  Add new <br></br>Documents field
                </p>
                <p>For Batch {batch}</p>
              </div>
            </div>
            <div className="bg-white h-full w-1/4 rounded-xl gap-5 shadow-lg flex justify-center items-center">
              <div
                className="p-3 bg-green-100 rounded-full shadow-sm shadow-green-700 cursor-pointer"
                onClick={handleDownloadExcel}
              >
                <SiMicrosoftexcel color="#19794D" size="2.5rem" />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-base nunito opacity-75 text-gray-500">
                  Download <br /> Excel sheet
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
            <Pagination
              pageCount={pgCount}
              fetchData={fetchData}
              batch={batch}
              currentPage={page}
              setStudentData={setStudentData}
            />
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
                      <th className="py-4 px-4">
                        Admission Category :
                        <select className=" ml-3 p-1 border border-gray-400 rounded mt-1">
                          <option selected>ALL</option>
                          <option>CET</option>
                          <option>COMEDK</option>
                          <option>MQ</option>
                        </select>
                      </th>
                      <th className="py-4 px-4">
                        Status
                        <select className=" ml-3 p-1 border border-gray-400 rounded mt-1">
                          <option selected>ALL</option>
                          <option> DONE</option>
                          <option>PENDING</option>
                        </select>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student, index) => (
                      <tr
                        key={student.id}
                        className="text-center border-b border-gray-30 hover:bg-slate-100 cursor-pointer"
                        onClick={() => setId(student.id)}
                      >
                        <td className="py-2 px-4">{student.insertion_order}</td>
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
