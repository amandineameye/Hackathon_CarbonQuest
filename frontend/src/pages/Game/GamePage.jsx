import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GamePage = () => {
	const { unityProvider, addEventListener, removeEventListener } =
		useUnityContext({
			loaderUrl: "../game/Build/build.loader.js",
			frameworkUrl: "../game/Build/build.framework.js",
			dataUrl: "../game/Build/build.data",
			codeUrl: "../game/Build/build.wasm",
		});
	const navigate = useNavigate();

	const handleEndGame = useCallback(
		async (score, falseAnswers) => {
			console.log("La partie est finie. Le score est de " + score);
			console.log(
				"Le joueur a mal répondu aux questions :" +
					(falseAnswers?.length ? falseAnswers.join(",") : "aucune")
			);
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_URL}/game`,
					{ score },
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.status === 200) {
					console.log("Le score a bien été envoyé à l'API.");
				} else {
					console.error("L'envoi du score à l'API a échoué.");
				}
			} catch (error) {
				console.error("Erreur lors de l'envoi du score à l'API:", error);
			}
			navigate("/results", { state: { score, falseAnswers } });
		},
		[navigate]
	);

	useEffect(() => {
		addEventListener("EndGame", handleEndGame);
		return () => {
			removeEventListener("EndGame", handleEndGame);
		};
	}, [addEventListener, removeEventListener, handleEndGame]);

	return (
		<>
			<main className="flex-1">
				<div className="container py-10 flex justify-center">
					<Unity
						style={{ width: 1200, height: 700 }}
						unityProvider={unityProvider}
					/>
				</div>
			</main>
		</>
	);
};

export default GamePage;
