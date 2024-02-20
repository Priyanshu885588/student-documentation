import React, { useState } from "react";
import { documentsUpload } from "./Services/Services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const StudentDocuments = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    photo: null,
    aadhaar: null,
    marks10: null,
    marks12: null,
    transferCertificate: null,
    studyCertificate: null,
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFiles({ ...files, [field]: file });
  };
  console.log(files);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("documents", file); // Append files to the FormData object with the key "documents"
    });

    try {
      const response = await documentsUpload(formData, batch);
      navigate("/thankyou");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen justify-center items-center">
      <div className="bg-cyan-900 text-white py-4">
        <h1 className="text-3xl font-bold text-center">STUDENT INFORMATION</h1>
      </div>
      <form
        className="mx-36 p-5 px-16 bg-slate-100"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="bg-yellow-200 text-white py-4 text-center my-5 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-left text-black mx-10">
            File upload
          </h1>
        </div>
        <div className="max-w-4xl mx-auto">
          {Object.keys(files).map((key) => (
            <div key={key} className="flex flex-col gap-2 p-7">
              <div className="px-2 w-fit Roboto roboto border-l-2 border-black">
                {key}
              </div>
              <input
                type="file"
                name={key}
                id={key}
                className="block w-full cursor-pointer border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 file:sm:py-5 dark:file:bg-gray-700 dark:file:text-gray-400"
                onChange={(event) => handleFileChange(event, key)}
                required
              />
            </div>
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
              type="submit"
              className="mt-7 mb-10 ml-56 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-24 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
