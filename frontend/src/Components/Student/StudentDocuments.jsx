import React, { useState, useEffect } from "react";
import { documentsUpload } from "./Services/Services";
import { getDocumentURL } from "./Services/Services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";
import { getDocumentsDetails } from "./Services/Services";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tooltip, Button } from "@material-tailwind/react";
import axios from "axios";

export const StudentDocuments = () => {
  const { batch } = useParams();
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const [currentFile, setCurrentFIle] = useState();
  const [docLoading, setDocLoading] = useState(false);
  const submitHandler = async (e) => {
    setDocLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const data = await getDocumentURL(batch, currentFile);

      // Now upload the file using the obtained URL
      await axios.put(data.url, file, {
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      const msg = await documentsUpload(
        { key: data.path, fileName: currentFile },
        batch
      );
      console.log(msg);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("File uploading failed");
    } finally {
      setDocLoading(false);
    }
  };
  useEffect(() => {
    const fetchDocDetails = async () => {
      try {
        const data = await getDocumentsDetails(batch);
        const { id, ...rest } = data;
        console.log(rest);
        setFiles(rest);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocDetails();
  }, [submitHandler]);

  const handlelogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/");
  };
   

  return (
    <>
      <Toaster />
      {overlay && (
        <div className="fixed h-screen w-screen backdrop-blur-md flex justify-center items-center">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Dear Student,
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                This is to confirm that we alerady have your submitted
                documents. If you wish to make any changes or resubmit, please
                contact the administration for further assistance.
              </p>
              <button
                onClick={handlelogout}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                logout
              </button>
            </div>
          </div>
        </div>
      )}
      {docLoading && (
        <div className="min-h-screen fixed top-0 z-50 bg-black/[0.9] text-white w-screen flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
        </div>
      )}
      <div className="bg-white min-h-screen justify-center items-center">
        <div className="bg-cyan-900 text-white py-4">
          <h1 className="text-3xl font-bold text-center">
            STUDENT INFORMATION
          </h1>
        </div>
        <div
          className="mx-36 p-5 px-16 bg-slate-100"
          encType="multipart/form-data"
        >
          <div className="bg-yellow-200 text-white py-4 text-center my-5 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-left text-black mx-10">
              File upload
            </h1>
          </div>
          <div className="max-w-4xl mx-auto flex flex-wrap">
            {files &&
              Object.keys(files).map((key) => (
                <form
                  key={key}
                  className="flex flex-col gap-2 p-7 w-1/2"
                  onSubmit={submitHandler}
                >
                  <div className="px-2 w-full Roboto roboto border-l-2 border-black flex justify-between">
                    <p>{key}</p>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="px-2 py-1 rounded-lg bg-black text-white text-sm active:scale-90"
                        type="submit"
                        onClick={() => setCurrentFIle(key)}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="file"
                    id={key}
                    className="block w-full cursor-pointer border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 file:sm:py-5 dark:file:bg-gray-700 dark:file:text-gray-400"
                    accept="application/pdf"
                    required
                  />
                  {files[key] && (
                    <div className="flex gap-2">
                      <p className="text-sm quicksand text-red-500">
                        Document alerady uploaded
                      </p>

                      <div class="group relative cursor-pointer">
                        <FaCircleInfo />
                        <span class="tooltip w-48 absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out text-sm bg-gray-800/[0.8] text-white/[0.8] px-2 py-1 rounded-md shadow-md">
                          Are you sure you want to replace the existing
                          document?
                        </span>
                      </div>
                    </div>
                  )}
                </form>
              ))}
            <div className="grid md:grid-cols-2 md:gap-10 px-10">
              <div>
                <div className="flex justify-between mb-1 mt-7 w-2/3">
                  <span className="text-base font-medium text-black">
                    Progress
                  </span>
                  <span className="text-sm font-medium text-black">1 of 2</span>
                </div>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-400 h-2.5 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => navigate("/thankyou")}
                className="mt-7 mb-10 ml-56 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
