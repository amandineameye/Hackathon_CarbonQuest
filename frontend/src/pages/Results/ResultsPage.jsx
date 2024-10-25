import {
	Accordion,
	AccordionHeader,
	AccordionPanel,
} from "../../components/Accordion/Accordion";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
	const location = useLocation();
	const { score, falseAnswers } = location.state || {};

	//? Pour tester
	// Si le score est entre 0 et 4 --> Nouveau-né du Green IT, tu commences à décourvir le sujet.
	// Si le score est 5 --> Apprenti Écoresponsable, tu es en bonne voie mais il te reste des progrès à faire.
	// Si le score est entre 6 et 8 --> Éco-Explorateur, tu maîtrise bien les bases du Green IT.
	// Si le score est entre 9 et 10 (inclus) --> Green IT Guru, tu excelles le sujet !

	//    const score = 10;
	const question = "";
	const GoodAnswer = "";
	const GamerAnswer = "";
	const link = "";

	const result = () => {
		switch (true) {
			case score <= 4:
				return (
					<div>
						<h3 className="bg-[#f3d7d5] p-1 rounded-sm">
							Nouveau-né du Green IT
						</h3>
						<p className="text-lg">Tu commences à décourvir le sujet.</p>
						<div className="mt-4 rounded-full mx-auto bg-custom-pink w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">
							{score}
						</div>
					</div>
				);
			case score === 5:
				return (
					<div>
						<h3 className="bg-[#c1ada8] p-1 rounded-sm">
							Apprenti Écoresponsable
						</h3>
						<p>Tu es en bonne voie mais il te reste des progrès à faire.</p>
						<div className="mt-4 rounded-full mx-auto bg-custom-purple w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">
							{score}
						</div>
					</div>
				);
			case score >= 6 && score <= 8:
				return (
					<div>
						<h3 className="bg-[#dfe8ae] p-1 rounded-sm">Éco-Explorateur</h3>
						<p>Tu maîtrise bien les bases du Green IT.</p>
						<div className="mt-4 rounded-full mx-auto bg-custom-yellow w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">
							{score}
						</div>
					</div>
				);
			case score >= 9 && score <= 10:
				return (
					<div>
						<h3 className="bg-[#d5e5cd] p-1 rounded-sm">Green IT Guru</h3>
						<p>Tu excelles le sujet !</p>
						<div className="mt-4 rounded-full mx-auto bg-custom-light-green w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">
							{score}
						</div>
					</div>
				);
			default:
				return <div></div>;
		}
	};

	return (
		<>
			<main className="flex-1">
				<div className="container text-center mt-16">
					<h1>Les résultats de ta quête</h1>
					<div className="bg-[#f5f8f6] rounded-lg p-8 w-1/2 mx-auto mt-8">
						<h2>Ton score</h2>
						{result()}
					</div>
				</div>

				<div className="container py-16">
					<div className="py-2 px-6 bg-white rounded-lg w-9/12 mx-auto">
						<Accordion>
							<AccordionHeader>
								1. Utiliser uniquement des formats d’image optimisés comme WebP
								réduit l'empreinte environnementale tout en garantissant une
								qualité visuelle suffisante.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Vrai
								</p>
								<p className="mb-2">
									Le format WebP permet de réduire la taille des fichiers tout
									en maintenant une qualité visuelle acceptable. Cela diminue la
									bande passante utilisée et améliore les performances des sites
									web, ce qui se traduit par une réduction de la consommation
									d’énergie.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=9-5062-frontend-les-services-utilisent-plusieurs-tailles-dune-meme"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								2. Précharger toutes les ressources CSS et JavaScript à l'avance
								améliore la performance et réduit la consommation de données.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Faux
								</p>
								<p className="mb-2">
									Précharger trop de ressources peut en réalité surcharger le
									navigateur et consommer des ressources inutiles, entraînant
									une augmentation des transferts de données et de l’empreinte
									carbone. Il est préférable de charger les ressources de
									manière asynchrone ou différée.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=3-7041-backend-les-echanges-indispensables-doivent-permettre-de-reduire"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								3. Charger des polices de caractères localement ou de façon
								asynchrone améliore les performances tout en réduisant l'impact
								environnemental.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Vrai
								</p>
								<p className="mb-2">
									Charger les polices localement ou de manière asynchrone permet
									de réduire le nombre de requêtes serveur et d’améliorer les
									performances du site, ce qui contribue à réduire l’empreinte
									carbone.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=8-3058-uxui-les-polices-de-caracteres-peuvent-etre-tres"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								4. Héberger un site sur un serveur mutualisé contribue à réduire
								l'empreinte carbone du site.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Vrai
								</p>
								<p className="mb-2">
									Les serveurs mutualisés partagent les ressources entre
									plusieurs utilisateurs, ce qui permet de réduire la
									consommation d'énergie par utilisateur par rapport à un
									hébergement sur un serveur dédié.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=1-8017-hebergement-le-domaine-de-lhebergement-se-struture-pour"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								5. Un CDN (Content Delivery Network) diminue les émissions en
								rapprochant les serveurs des utilisateurs, mais n’améliore pas
								toujours la vitesse de chargement.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Faux
								</p>
								<p className="mb-2">
									En plus de réduire les distances de transfert des données, un
									CDN améliore souvent les temps de chargement en distribuant
									les ressources à partir de serveurs situés plus près des
									utilisateurs finaux, optimisant ainsi à la fois la performance
									et la consommation énergétique.
								</p>
								<a className="flex justify-self-end font-medium mb-3" href="#">
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								6. Ne pas utiliser de cache réduit l'impact environnemental en
								évitant de stocker des données inutiles à long terme.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Faux
								</p>
								<p className="mb-2">
									Ne pas utiliser de cache oblige le serveur à traiter chaque
									requête de manière répétée, augmentant ainsi la consommation
									d’énergie et les temps de chargement. Le cache réduit la
									consommation d’énergie en limitant les requêtes redondantes
									vers le serveur.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=3-7041-backend-les-echanges-indispensables-doivent-permettre-de-reduire"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								7. Limiter les animations non essentielles sur un site web
								réduit la consommation énergétique sans détériorer l'expérience
								utilisateur.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Vrai
								</p>
								<p className="mb-2">
									Les animations et les vidéos en lecture automatique consomment
									beaucoup de bande passante et nécessitent davantage de
									puissance de traitement, ce qui augmente la consommation
									d'énergie et donc l'empreinte carbone du site web.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=5-3029-uxui-des-elements/composants-visuels-sonores-et-tactiles-peuvent"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
						<Accordion>
							<AccordionHeader>
								8. Utiliser des frameworks légers plutôt que des technologies
								complexes aide à réduire l'empreinte carbone des sites web.
							</AccordionHeader>
							<AccordionPanel>
								<p className="flex w-fit font-medium mb-2 bg-[#dfe8ae] p-2 rounded-sm">
									Vrai
								</p>
								<p className="mb-2">
									Les frameworks légers nécessitent moins de ressources pour
									être exécutés, réduisant ainsi l’énergie consommée par les
									serveurs et les navigateurs, tout en maintenant des
									performances optimales.
								</p>
								<a
									className="flex justify-self-end font-medium mb-3"
									href="https://gr491.isit-europe.org/crit.php?id=1-8017-hebergement-le-domaine-de-lhebergement-se-struture-pour"
								>
									Plus d'infos
								</a>
							</AccordionPanel>
						</Accordion>
					</div>
				</div>
			</main>
		</>
	);
};

export default ResultsPage;
