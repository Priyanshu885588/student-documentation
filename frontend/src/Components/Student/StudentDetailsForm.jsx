import React from "react";

export const StudentDetailsForm = () => {
  return (
    <div>
      <div className="bg-blue-500 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Student Information</h1>
      </div>
      
<form className="mx-24" >
<div className="bg-yellow-500 text-white py-4 my-5 ">
        <h1 className="text-3xl font-bold text-LEFT  mx-10">PERSONAL DEATILS</h1>
      </div>
    <div class="grid gap-6 mb-6 p-3 md:grid-cols-2 bg-slate-200 ">
        <div>
            <label className="block mb-2 text-sm font-bold  text-gray-900 dark:text-black">FIRST NAME</label>
            <input type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER FIRST NAME" required />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">LAST NAME</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER LAST NAME" required />
        </div>
        <div>
    <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">DATE OF BIRTH</label>
    <input type="date"  placeholder="Select Date of Birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
</div>

 
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">PHONE NUMBER</label>
            <input type="tel"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER PHONE NUMBER" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
        <div>
    <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">GENDER</label>
    <select  name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    </select>
</div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">AADHAR NUMBER</label>
            <input type="TEXT"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER AADHAR NUMBER" required />
        </div>
    </div>  
    <div class="mb-6 -mt-7 p-3 px-3  bg-slate-200 ">
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">EMAIL ADDRESS</label>
        <input type="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER EMAIL ID" required />
    </div> 
    <div class="grid gap-6 mb-6 -mt-7 p-3 md:grid-cols-2 bg-slate-200 ">
        <div>
            <label className="block mb-2 text-sm font-bold  text-gray-900 dark:text-black">RELIGION</label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER RELIGION" required />
        </div>
        
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">CATEGORY</label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER CATEGORY" required />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">NATIONALITY</label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER NATIONALITY"  required />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">STATE</label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER STATE" required />
        </div>
        
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">CURRENT ADDRESS</label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER CURRENT ADDRESS" required />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">PERMENENT ADDRESS </label>
            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ENTER PERMENENT ADDRESS" required />
        </div>
    </div>
    <div className="bg-yellow-500 text-white py-4 my-5 ">
        <h1 className="text-3xl font-bold text-LEFT  mx-10">ACADEMIC DETAILS</h1>
      </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

    
</form>

    </div>
    
  );
};
