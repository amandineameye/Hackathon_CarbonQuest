import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSwitchToLogin, onSuccessfulConnection }) => {
   const [showPassword, setShowPassword] = useState(false);

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const playerData = { username, email, password };
      try {
         console.log("SUBMIT - API URL >>>", process.env.REACT_APP_API_URL);

         const response = await axios.post(
         	`${process.env.REACT_APP_API_URL}/signup`,
         	playerData,
         	{
         		headers: {
         			"Content-Type": "application/json",
         		},
         	}
         );

         console.log("Inscription réussie:", response.data);
         // navigate("/game");
         // onSuccessfulConnection();
         // console.log("YOUHOU test réussi!");
      } catch (error) {
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
                  />
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
                  />
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
