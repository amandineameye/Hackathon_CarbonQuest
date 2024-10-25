import { useState } from "react";
import axios from "axios";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserSchema = z.object({
   username: z.string()
      .min(1, { message: '1 caractère minimum' })
      .max(10, { message: '10 caractères maximum' })
      .trim(),
   email: z.string()
      .email({ message: 'Email incorrect' }),
   password: z.string()
      .min(8, { message: '8 caractères minimum' })
      .max(15, { message: '15 caractères maximum' }),
});


const Signup = ({ onSwitchToLogin, onSuccessfulConnection }) => {
   const [showPassword, setShowPassword] = useState(false);

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const { register, formState: { errors } } = useForm({
      resolver: zodResolver(UserSchema)
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      const playerData = { username, email, password };
      try {
         const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/signup`,
            playerData,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         /**
          * data.success = bool
          * data.message = string
         */
         // création compte ok
         if (response.data.success) {
            console.log("Inscription réussie:", response.data);
            navigate("/game");
            onSuccessfulConnection();
            console.log("YOUHOU test réussi!");
         }
      } catch (error) {
         console.error(
            "Erreur lors de l’inscription:",
            error.response || error.message
         );
         console.error(
            "Erreur lors de l’inscription:",
            error.response || error.message
         );
      }
   };

   return (
      <>
         <div className="px-8 pt-14 pb-8">
            <h2 className="text-center">Inscris-toi pour jouer</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="username" className="input-label">
                     Pseudo
                  </label>
                  <input
                     id="username"
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                     className="input"
                     {...register('username')}
                  />
                  {errors.username && (
                     <span className="text-red-500">{errors.username.message}</span>
                  )}
               </div>
               <div>
                  <label htmlFor="email" className="input-label">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className="input"
                     placeholder='max.10 caractères'
                     {...register('email')}
                  />
                  {errors.email && (
                     <span className="text-red-500">{errors.email.message}</span>
                  )}
               </div>
               <div>
                  <label htmlFor="password" className="input-label">
                     Mot de passe
                  </label>
                  <div className="relative">
                     <input
                        className="input pr-8"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='min. 8 caractères'
                        {...register('password')}
                     />
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
                     {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                     )}
                  </div>
               </div>
               <button
                  className="bg-text font-medium text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-text-light transition-200"
                  type="submit"
               >
                  Créer un compte
               </button>
            </form>

            <p
               className="text-center font-medium text-title mt-6"
               onClick={onSwitchToLogin}
            >
               Déjà inscrit ?{" "}
               <span className="cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline">
                  Se connecter
               </span>
            </p>
         </div>
      </>
   );
};

export default Signup;
