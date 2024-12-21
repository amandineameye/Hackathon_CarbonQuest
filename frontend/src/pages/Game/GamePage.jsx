import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GamePage = () => {
	const { unityProvider, addEventListener, removeEventListener } =
		useUnityContext({
			loaderUrl: "../game/Build/build2.loader.js",
			frameworkUrl: "../game/Build/build2.framework.js",
			dataUrl: "../game/Build/build2.data",
			codeUrl: "../game/Build/build2.wasm",
		});
	const navigate = useNavigate();
	const location = useLocation();

	const handleEndGame = useCallback((answersString) => {
		console.log(answersString);
	}, []);

	useEffect(() => {
		addEventListener("ButtonClicked", handleEndGame);
		return () => {
			removeEventListener("ButtonClicked", handleEndGame);
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
