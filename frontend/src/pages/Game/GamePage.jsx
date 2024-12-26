import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
	const { unityProvider, addEventListener, removeEventListener } =
		useUnityContext({
			loaderUrl: "../game/Build/build6.loader.js",
			frameworkUrl: "../game/Build/build6.framework.js",
			dataUrl: "../game/Build/build6.data",
			codeUrl: "../game/Build/build6.wasm",
		});
	const navigate = useNavigate();

	const handleEndGame = useCallback(
		(answersString) => {
			console.log(answersString);
			navigate("/results", { state: { answersString } });
		},
		[navigate]
	);

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
