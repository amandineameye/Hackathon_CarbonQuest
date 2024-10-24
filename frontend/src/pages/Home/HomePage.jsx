import homeImage from "../../assets/home.png";
import { useState } from "react";
import AuthModal from "../../containers/AuthModal/AuthModal.jsx";

const HomePage = () => {
	const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
	const [authModalType, setAuthModalType] = useState("login");

	const handleLoginModal = (e) => {
		e.preventDefault();
		setAuthModalType("login");
		setIsAuthModalVisible(true);
	};

	const handleSignUpModal = (e) => {
		e.preventDefault();
		setAuthModalType("signup");
		setIsAuthModalVisible(true);
	};

	const closeAuthModal = () => {
		setIsAuthModalVisible(false);
	};

	const switchToLogin = () => {
		setAuthModalType("login");
	};

	const switchToSignup = () => {
		setAuthModalType("signup");
	};

	return (
		<>
			<header className="absolute shadow-lg top-0 left-0 w-full z-10 bg-custom-green">
				<div className="container py-3 flex justify-between items-center">
					<div className="font-logo text-custom-blue text-2xl sm:text-3xl pb-2 cursor-pointer">
						Carbon Quest
					</div>
					<ul className="flex items-center gap-4">
						<li className="bg-custom-yellow hover:bg-custom-light-yellow rounded-xl transition-200 p-2">
							<a
								href="#"
								onClick={handleLoginModal}
								className="text-lg font-semibold  text-title hover:text-black p-3"
							>
								Connexion
							</a>
						</li>
						<li className="p-2">
							<a
								href="#"
								onClick={handleSignUpModal}
								className="text-lg font-semibold text-title hover:text-black transition-200"
							>
								Inscription
							</a>
						</li>
					</ul>
				</div>
			</header>

			<main className="flex flex-1 py-4">
				<div className="container flex flex-col xl:flex-row gap-4">
					<div className="flex flex-col  w-full xl:w-1/2 bg-[#f5f8f6] rounded-lg justify-center py-10 px-10">
						<h2>Carbon Quest, quésaco ?</h2>
						<div>
							<p className="pb-4">
								Carbon Quest est un{" "}
								<span className="font-semibold">jeu éducatif</span> de
								plates-formes qui vous invite à explorer les enjeux du{" "}
								<span className="font-semibold">Green IT</span>, l’ensemble des
								pratiques visant à réduire l’impact environnemental des
								technologies numériques, de leur conception à leur utilisation.
							</p>

							<h3>But du jeu</h3>
							<p className="pb-4">
								Votre mission est de grimper jusqu’au sommet de la canopée avant
								la fin du temps imparti, tout en répondant correctement à un
								maximum de questions. Votre score final influence l’état du
								ciel, que vous ne découvrirez qu’une fois arrivés en haut. Un
								ciel dégagé est le signe de bonnes réponses, tandis qu’un ciel
								sombre reflète des erreurs accumulées.
							</p>

							<h3>Comment jouer ?</h3>
							<ul className="pb-4 list-disc list-inside">
								<li className="pb-2">
									Utilisez les touches directionnelles et la barre d'espace pour
									vous déplacer vers le haut de la forêt.
								</li>
								<li className="pb-2">
									À chaque palier, un esprit de la forêt vous posera une
									question.
								</li>
								<li className="pb-2">
									Une mauvaise réponse ne vous empêche pas de continuer à
									monter, mais elle affectera le résultat final.
								</li>
								<li className="pb-2">
									Une fois au sommet, vous pourrez consulter vos réponses, voir
									vos erreurs, et en apprendre davantage sur le Green IT.
								</li>
							</ul>
							<p>Parviendrez-vous à réduire la pollution numérique ?</p>
							<button
								onClick={handleLoginModal}
								className="flex text-md font-semibold bg-title hover:bg-text-light transition-200 rounded-lg text-white px-5 py-2 transition-200 mx-auto mt-8"
							>
								Jouer
							</button>
						</div>
					</div>
					<div className="flex flex-col w-full xl:w-1/2">
						<img src={homeImage} alt="" />
					</div>
				</div>
				<AuthModal
					visible={isAuthModalVisible}
					modalType={authModalType}
					onClose={closeAuthModal}
					switchToLogin={switchToLogin}
					switchToSignup={switchToSignup}
				/>
			</main>
		</>
	);
};

export default HomePage;
