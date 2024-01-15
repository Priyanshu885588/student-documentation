import React from "react";
import { useState } from "react";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadFile } from "./services/Api";
import { Loading } from "../UI/Loading";
import { useNavigate } from "react-router-dom";

export const AdminUpload = () => {
  const [batch, setBatch] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!batch || !file) {
      console.error("Batch and file are required.");
      return;
    }
    const formData = new FormData();
    formData.append("excelFile", file);
    formData.append("batch", batch);

    try {
      const result = await uploadFile(formData);
      navigate("/admin/dashboard");
      console.log("Upload successful:", result);
      setBatch("");
      setFile(null);
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-gray-300 to-gray-100">
      <VerticalNavbar />
      <div className="w-full text-center p-3 text-xl quicksand font-bold tracking-widest">
        Admin Upload
      </div>
      <div className="h-5/6 w-full flex justify-center items-center">
        <div className="w-9/12 bg-white rounded-2xl flex justify-center gap-3 items-center p-10 shadow-xl shadow-gray-400">
          <form
            onSubmit={submitHandler}
            className="w-1/2 flex flex-col justify-center items-center gap-2"
          >
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 bg-white border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IoCloudUploadOutline color="black" size="3rem" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleFileChange}
                  name="excelFile"
                  className="w-fit block bg-transparent text-xs"
                  accept=".xlsx, .xls"
                  required
                />
              </label>
            </div>

            <div className="w-full">
              <label
                htmlFor="batch"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter the batch
              </label>
              <input
                type="text"
                id="batch"
                onChange={(e) => setBatch(e.target.value)}
                value={batch}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter the batch"
                required
              />
            </div>
            <button
              type="submit"
              className="text-blue-700 hover:text-white border w-full border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              submit
            </button>
          </form>
          <div className="w-1/2 flex justify-center items-center flex-col gap-4">
            <h2 className="text-center nunito uppercase">Instructions</h2>
            <p className="text-sm w-10/12 text-gray-500 roboto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque,
              molestiae expedita vero perferendis neque ad quibusdam sit quam
              ducimus magnam tenetur unde esse? Eligendi officia sit, pariatur
              mollitia quos exercitationem repellat sed cum odio tempora sint
              qui laudantium aperiam voluptates veritatis iure quisquam, quasi
              veniam atque voluptatem optio recusandae consequatur maxime. Nam
              minus dolor alias adipisci placeat esse magni perspiciatis harum
              officia ipsa id eveniet vel quasi culpa, eos, iste modi porro
              reprehenderit vero omnis voluptates vitae delectus! Quod quibusdam
              perferendis error, praesentium, iusto obcaecati quaerat ea illum
              suscipit totam cupiditate? Sint laudantium voluptas iusto nobis?
              Sequi vitae amet praesentium!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
