import React from "react";
import { loginanimation } from "../UI/loginanimation";

import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

const Login = () => {
    return (
            <>
            
            <div className="w-96 bg-transparent border-2 border-opacity-20 border-white shadow-md backdrop-blur-3xl text-white rounded-2xl p-8 z-100">
                <form action="">
                    <h1 className="text-3xl text-center" >Login</h1>
                    <div className="relative w-full h-16 my-8">
                       
                        <input type="text" className="w-full h-full bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:to-white" id="username" placeholder="Username" required />
                        <HiOutlineUserCircle className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
                    </div>
                    <div className="relative w-full h-16 my-8">
                        
                        <input type="text" className="w-full h-full bg-transparent border-2 border-yellow-500 outline-none rounded-full text-white text-base px-5 py-5 placeholder:to-white" id="username" placeholder="Unique ID" required/>
                        <FaRegAddressCard className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-base" />
                    </div>
                    <button type="submit" className="w-full h-12 bg-white text-black border-2 outline-none rounded-full shadow-sm cursor-pointer text-base font-semibold transition duration-300 ease-in-out hover:bg-transparent hover:text-white" >Login</button>
                </form>
            </div>
            </>
       
    );
};

export default Login;
