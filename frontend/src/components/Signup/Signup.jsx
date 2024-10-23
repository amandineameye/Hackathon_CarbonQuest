import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ onSwitchToLogin }) => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <>
         <div className="px-8 pt-16 pb-8">
            <h2 className="text-2xl text-custom-wine font-semibold font-title text-center mb-5">
               Sign up to save your trips
            </h2>
            <form className="flex flex-col gap-3">
               <div>
                  <label htmlFor="username" className="input-label text-darkerText">Username</label>
                  <input id="username" type="text" className="input" />
               </div>
               <div>
                  <label htmlFor="email" className="input-label text-darkerText">Email</label>
                  <input id="email" type="email" className="input" />
               </div>
               <div>
                  <label htmlFor="password" className="input-label text-darkerText">Password</label>
                  <div className="relative">
                     <input className="input pr-8" id="password" type={showPassword ? "text" : "password"} />
                     {showPassword ? (
                        <FaEye
                           className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     ) : (
                        <FaEyeSlash
                           className="text-darkerText absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     )}
                  </div>
               </div>
               <button className="bg-custom-yellow text-white py-1.5 mt-4 block w-full hover:bg-custom-lightYellow transition-200">
                  Create Account
               </button>
            </form>

            <p className="text-center text-darkerText mt-6"
               onClick={onSwitchToLogin}>Already have an Account? <span className='cursor-pointer font-medium text-custom-orange hover:text-custom-orange-700 underline'>Log in</span></p>
         </div>
      </>
   );
};

export default Signup;