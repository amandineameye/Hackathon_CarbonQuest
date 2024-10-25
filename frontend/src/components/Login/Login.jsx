import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitchToSignup, onSuccessfulConnection }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const playerData = { username: username.trim(), password: password.trim() };

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/login`,
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
				// La réponse de l'API doit contenir un champ indiquant si la connexion a réussi (par exemple, response.data.success). Cette structure doit être gérée par les WAD
				console.log("Connexion réussie:", response.data);
				navigate("/game");
				onSuccessfulConnection();
			} else {
				setErrorMessage(response.data.message || "Identifiants incorrects.");
			}
		} catch (error) {
			if (error.response) {
				setErrorMessage(
					error.response.data.message ||
						"Une erreur est survenue. Veuillez réessayer plus tard."
				);
			} else {
				setErrorMessage(
					"Une erreur est survenue. Veuillez réessayer plus tard."
				);
			}
			console.error(
				"Erreur lors de la connexion:",
				error.response || error.message
			);
		}
	};

	return (
		<>
			<div className="px-8 pt-14 pb-8">
				<h2 className="text-center">Connecte-toi pour jouer</h2>
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
							className="input"
							required
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
					<button
						className="bg-text font-medium text-white py-1.5 rounded-lg mt-4 block w-full hover:bg-text-light transition-200"
						type="submit"
					>
						Se connecter
					</button>
				</form>

				{errorMessage && (
					<p className="text-red-500 text-center mt-4">{errorMessage}</p>
				)}
				<p
					className="text-center font-medium text-title mt-6"
					onClick={onSwitchToSignup}
				>
					Pas encore de compte ?{" "}
					<span className="cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline">
						S'inscrire
					</span>
				</p>
			</div>
		</>
	);
};

export default Login;
