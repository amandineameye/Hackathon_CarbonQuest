import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ onSwitchToSignup }) => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <>
         <div className="px-8 pt-16 pb-8">
            <h2 className="text-2xl text-black font-semibold font-title text-center mb-5">
               Log in to save your trips
            </h2>
            <form className="flex flex-col gap-3">
               <div>
                  <label htmlFor="username" className="input-label text-black">Username</label>
                  <input id="username" type="text" className="input" />
               </div>
               <div>
                  <label htmlFor="password" className="input-label text-black">Password</label>
                  <div className="relative">
                     <input className="input pr-8" id="password" type={showPassword ? "text" : "password"} />
                     {showPassword ? (
                        <FaEye
                           className="text-black absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     ) : (
                        <FaEyeSlash
                           className="text-black absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     )}
                  </div>
               </div>
               <button className="bg-custom-pink text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-custom-purple transition-200">
                  Submit
               </button>
            </form>
            <p className="text-center text-black mt-6"
               onClick={onSwitchToSignup}>Don't have an account yet? <span className='cursor-pointer font-medium text-custom-purple hover:text-custom-pink underline'>Sign up</span></p>
         </div>
      </>
   );
};

export default Login;