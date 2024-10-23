import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ onSwitchToLogin }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<div className="px-8 pt-14 pb-8">
				<h2 className="text-2xl text-title font-semibold font-title text-center mb-5">
					Inscris toi pour jouer
				</h2>
				<form className="flex flex-col gap-3">
					<div>
						<label htmlFor="username" className="input-label">
							Nom du joueur
						</label>
						<input id="username" type="text" className="input" />
					</div>
					<div>
						<label htmlFor="email" className="input-label">
							Email
						</label>
						<input id="email" type="email" className="input" />
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
					<button className="bg-custom-light-green font-medium text-title py-1.5 rounded-lg mt-4 block w-full hover:bg-custom-dark-green hover:text-white transition-200">
						Créer un compte
					</button>
				</form>

				<p
					className="text-center font-medium text-title mt-6"
					onClick={onSwitchToLogin}
				>
					Déjà inscrit ?{" "}
					<span className="cursor-pointer font-semibold text-custom-green hover:text-custom-dark-green underline">
						Se connecter
					</span>
				</p>
			</div>
		</>
	);
};

export default Signup;
