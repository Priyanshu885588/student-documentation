import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { studentDetailsSchema } from "./Schemas";
import { getStudentDetails, studentDetailsUpload } from "./Services/Services";
import { useParams } from "react-router-dom";

const StudentDetailsForm = () => {
  const { batch } = useParams();
  const [studentData, setStudentData] = useState();
  const [loading, setLoading] = useState(false);

  const initialValues = studentData
    ? {
        First_name: studentData.First_name || "",
        Last_name: studentData.Last_name || "",
        email: studentData.email || "",
        Phone_Number: studentData.Phone_Number || "",
        Aadhar_Number: studentData.Aadhar_Number || "",
        Gender: studentData.Gender || "",
        date_of_birth: studentData.date_of_birth || "",
        current_address: studentData.current_address || "",
        Permanent_address: studentData.Permanent_address || "",
        religion: studentData.religion || "",
        category: studentData.category || "",
        nationality: studentData.nationality || "",
        state: studentData.state || "",
        branch: studentData.branch || "",
        admission_quota: studentData.admission_quota || "",
        registration_number_10th: studentData.registration_number_10th || "",
        passing_year_10th: studentData.passing_year_10th || "",
        school_name_10th: studentData.school_name_10th || "",
        PUC_registration_Number: studentData.PUC_registration_Number || "",
        PUC_Passing_Number: studentData.PUC_Passing_Number || "",
        PUC_college_name: studentData.PUC_college_name || "",
      }
    : {
        First_name: "",
        Last_name: "",
        email: "",
        Phone_Number: "",
        Aadhar_Number: "",
        Gender: "",
        date_of_birth: "",
        current_address: "",
        Permanent_address: "",
        religion: "",
        category: "",
        nationality: "",
        state: "",
        branch: "",
        admission_quota: "",
        registration_number_10th: "",
        passing_year_10th: "",
        school_name_10th: "",
        PUC_registration_Number: "",
        PUC_Passing_Number: "",
        PUC_college_name: "",
      };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: studentDetailsSchema,
      onSubmit: async (values) => {
        const data = await studentDetailsUpload({ ...values, batch });
        fetchStudentDetails();
      },
    });
  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const data = await getStudentDetails(batch);
      setStudentData(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentDetails();
  }, []);

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <div className="bg-white">
      <div className="bg-cyan-900 text-white py-4">
        <h1 className="text-3xl font-bold text-center">STUDENT INFORMATION</h1>
      </div>

      <form
        className="mx-36 p-5 px-16"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="bg-yellow-200 text-white py-4 text-center my-5  max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-LEFT text-black mx-10">
            Personal Details
          </h1>
        </div>

        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.First_name || values.First_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="First_name"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label>

            {errors.First_name && !studentData && touched.First_name ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.First_name}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={initialValues.Last_name || values.Last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="Last_name"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name
            </label>
            {errors.Last_name && !studentData && touched.Last_name ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.Last_name}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group max-w-4xl mx-auto">
          <input
            value={initialValues.email || values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
          {errors.email && !studentData && touched.email ? (
            <p className="text-red-400 opacity-80 mt-1 text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.Phone_Number || values.Phone_Number}
              onChange={handleChange}
              onBlur={handleBlur}
              name="Phone_Number"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone Number
            </label>
            {errors.Phone_Number && !studentData && touched.Phone_Number ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.Phone_Number}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.Aadhar_Number || values.Aadhar_Number}
              onChange={handleChange}
              onBlur={handleBlur}
              name="Aadhar_Number"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Aadhar Number
            </label>
            {errors.Aadhar_Number && !studentData && touched.Aadhar_Number ? (
              <p className="text-red-400 opacity-80 mt-1 text-sm">
                {errors.Aadhar_Number}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl mt-5 mb-5 mx-auto ">
          <div className="flex items-center">
            <label className="block mb-2 text-lg  text-gray-500 dark:text-gray-500 mt-1.5">
              Gender
            </label>
            <select
              name="Gender"
              value={initialValues.Gender || values.Gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ml-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>--Select--</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.Gender && !studentData && touched.Gender ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.Gender}
              </p>
            ) : null}
          </div>
          <div className="flex items-center  ">
            <label className="block mb-2 text-lg  text-gray-500 dark:text-gray-500 mt-1">
              Date of birth
            </label>
            <input
              type="date"
              value={initialValues.date_of_birth || values.date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
              name="date_of_birth"
              placeholder="Select Date of Birth"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2 ml-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.date_of_birth && !studentData && touched.date_of_birth ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.date_of_birth}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group max-w-4xl mx-auto">
          <input
            value={initialValues.current_address || values.current_address}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="current_address"
            autoComplete="off"
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Current address
          </label>
          {errors.current_address && !studentData && touched.current_address ? (
            <p className="text-red-400 opacity-80 m-1 text-sm">
              {errors.current_address}
            </p>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group max-w-4xl mx-auto">
          <input
            type="text"
            name="Permanent_address"
            value={initialValues.Permanent_address || values.Permanent_address}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Permanent address
          </label>
          {errors.Permanent_address &&
          !studentData &&
          touched.Permanent_address ? (
            <p className="text-red-400 opacity-80 m-1 text-sm">
              {errors.Permanent_address}
            </p>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.religion || values.religion}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="religion"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Religion
            </label>
            {errors.religion && !studentData && touched.religion ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.religion}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.category || values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="category"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Category
            </label>
            {errors.category && !studentData && touched.category ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.category}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.nationality || values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="nationality"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nationality
            </label>
            {errors.nationality && !studentData && touched.nationality ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.nationality}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={initialValues.state || values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              name="state"
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              State
            </label>
            {errors.state && !studentData && touched.state ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.state}
              </p>
            ) : null}
          </div>
        </div>

        <div className="bg-yellow-200 text-white py-4 text-center my-5  max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-LEFT text-black mx-10">
            Acamadic Details
          </h1>
        </div>
        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl mt-5 mb-5 mx-auto ">
          <div className="flex items-center">
            <label className="block mb-2 text-lg  text-gray-500 dark:text-gray-500 mt-1.5">
              Branch
            </label>
            <select
              name="branch"
              value={initialValues.branch || values.branch}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ml-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>--Select--</option>
              <option value="civil">Civil Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Electrical Engineering</option>
              <option>Computer Engineering</option>
              <option>Chemical Engineering</option>
              <option>Aerospace Engineering</option>
              <option>Biomedical Engineering</option>
              <option>Environmental Engineering</option>
              <option>Industrial Engineering</option>
              <option>Materials Engineering</option>
            </select>
            {errors.branch && !studentData && touched.branch ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.branch}
              </p>
            ) : null}
          </div>
          <div className="flex items-center">
            <label className="block mb-2 text-lg  text-gray-500 dark:text-gray-500 mt-1.5">
              Admission quota{" "}
            </label>
            <select
              name="admission_quota"
              value={initialValues.admission_quota || values.admission_quota}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[64%] p-2 ml-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>--Select--</option>
              <option>CET</option>
              <option>COMEDK</option>
              <option>AICTE</option>
              <option>MQ</option>
            </select>
            {errors.admission_quota &&
            !studentData &&
            touched.admission_quota ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.admission_quota}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={
                initialValues.registration_number_10th ||
                values.registration_number_10th
              }
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="registration_number_10th"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              10th registeration number
            </label>
            {errors.registration_number_10th &&
            !studentData &&
            touched.registration_number_10th ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.registration_number_10th}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={
                initialValues.passing_year_10th || values.passing_year_10th
              }
              onChange={handleChange}
              onBlur={handleBlur}
              name="passing_year_10th"
              type="text"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              10th passing year
            </label>
            {errors.passing_year_10th &&
            !studentData &&
            touched.passing_year_10th ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.passing_year_10th}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group max-w-4xl mx-auto">
          <input
            value={initialValues.school_name_10th || values.school_name_10th}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="school_name_10th"
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            10th school name
          </label>
          {errors.school_name_10th &&
          !studentData &&
          touched.school_name_10th ? (
            <p className="text-red-400 opacity-80 m-1 text-sm">
              {errors.school_name_10th}
            </p>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div className="relative z-0 w-full mb-5 group ">
            <input
              value={
                initialValues.PUC_registration_Number ||
                values.PUC_registration_Number
              }
              onChange={handleChange}
              onBlur={handleBlur}
              name="PUC_registration_Number"
              type="text"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              PUC/Diploma Registration Number
            </label>
            {errors.PUC_registration_Number &&
            !studentData &&
            touched.PUC_registration_Number ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.PUC_registration_Number}
              </p>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={
                initialValues.PUC_Passing_Number || values.PUC_Passing_Number
              }
              onChange={handleChange}
              onBlur={handleBlur}
              name="PUC_Passing_Number"
              type="text"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              PUC /Diploma Passing Year
            </label>
            {errors.PUC_Passing_Number &&
            !studentData &&
            touched.PUC_Passing_Number ? (
              <p className="text-red-400 opacity-80 m-1 text-sm">
                {errors.PUC_Passing_Number}
              </p>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group max-w-4xl mx-auto">
          <input
            value={initialValues.PUC_college_name || values.PUC_college_name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="PUC_college_name"
            type="text"
            autoComplete="off"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            PUC/Diploma college name{" "}
          </label>
          {errors.PUC_college_name &&
          !studentData &&
          touched.PUC_college_name ? (
            <p className="text-red-400 opacity-80 m-1 text-sm">
              {errors.PUC_college_name}
            </p>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 md:gap-24 max-w-4xl  mx-auto ">
          <div>
            <div className="flex justify-between mb-1 mt-7 w-2/3">
              <span className="text-base font-medium text-black">Progress</span>
              <span className="text-sm font-medium text-black ">
                {studentData ? 1 : 0} of 2
              </span>
            </div>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5  dark:bg-gray-700">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={studentData ? { width: `50%` } : { width: "1%" }}
              ></div>
            </div>
          </div>
          {studentData ? (
            <Link
              to="/documentsForm"
              className={`mt-7 mb-10 ml-56 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-24  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
            `}
            >
              Next
            </Link>
          ) : (
            <button
              type="submit"
              disabled={studentData}
              className={`mt-7 mb-10 ml-56 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-24  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                studentData ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentDetailsForm;
