import {
   Accordion,
   AccordionHeader,
   AccordionPanel,
} from "../../components/Accordion/Accordion";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResultsPage = () => {
   const location = useLocation();
   const { score, answers, username } = location.state || {};
   const [allScores, setAllScores] = useState([]);
   const rightAnswers = [true, false, true, false, false, false, true, true, false, true];

   const evaluatedAnswers = answers.map((answer, index) => 
      answer === rightAnswers[index] ? "correct" : "wrong"
    );

   //? Pour tester
   // Si le score est entre 0 et 4 --> Nouveau-né du Green IT, tu commences à décourvir le sujet.
   // Si le score est 5 --> Apprenti Écoresponsable, tu es en bonne voie mais il te reste des progrès à faire.
   // Si le score est entre 6 et 8 --> Éco-Explorateur, tu maîtrise bien les bases du Green IT.
   // Si le score est entre 9 et 10 (inclus) --> Green IT Guru, tu excelles le sujet !

   //    const score = 10;


   useEffect(() => {
      const fetchScores = async () => {
         try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/scores`);
            setAllScores(response.data);  // assuming response.data contains an array of scores
         } catch (error) {
            console.error("Error fetching scores:", error);
         }
      };
      fetchScores();
   }, []);


   const userScores = allScores[username];

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

            {userScores && userScores.length > 1 && (
               <div className="container text-center mt-12">
                  <h2>Tes précédents scores</h2>
                  <div className="flex justify-center gap-4">
                     {/* Ici, il faut afficher les scores du tableau qu'on reçoit */}
                     {userScores.slice(1).map(score => (
                        <p className="rounded-full bg-text w-12 h-12 flex items-center justify-center text-white text-2xl font-semibold">{score}</p>
                     ))}
                  </div>
                  {result()}
               </div>
            )}

            <div className="container py-16">
               <div className="py-2 px-6 bg-white rounded-lg w-9/12 mx-auto">
                  <Accordion>
                     <AccordionHeader>
                        1. L’optimisation des images sur un site web peut réduire la consommation de bande passante et d’énergie.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p 
                        className={evaluatedAnswers[0] === "correct" ? "resTrue" : "resFalse"}
                        
                        >
                           Vrai
                        </p>
                        <p className="mb-2">
                           Des images optimisées chargent plus rapidement et consomment moins de données, ce qui réduit la consommation d'énergie liée à la navigation web.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=9-5062-frontend-les-services-utilisent-plusieurs-tailles-dune-meme"
                           target="_blank"
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
                        <p className={evaluatedAnswers[1] === "correct" ? "resTrue" : "resFalse"}>
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
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=3-7041-backend-les-echanges-indispensables-doivent-permettre-de-reduire"
                           target="_blank"
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
                        <p className={evaluatedAnswers[2] === "correct" ? "resTrue" : "resFalse"}>
                           Vrai
                        </p>
                        <p className="mb-2">
                           Charger les polices localement ou de manière asynchrone permet
                           de réduire le nombre de requêtes serveur et d’améliorer les
                           performances du site, ce qui contribue à réduire l’empreinte
                           carbone.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=8-3058-uxui-les-polices-de-caracteres-peuvent-etre-tres"
                           target="_blank"
                        >
                           Plus d'infos
                        </a>
                     </AccordionPanel>
                  </Accordion>
                  <Accordion>
                     <AccordionHeader>
                        4. Le choix des serveurs d’hébergement n'a pas d’impact significatif sur l’empreinte carbone d’un service numérique.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p className={evaluatedAnswers[3] === "correct" ? "resTrue" : "resFalse"}>
                           Faux
                        </p>
                        <p className="mb-2">
                           Les serveurs verts ou à faible consommation énergétique peuvent réduire significativement les émissions de CO2 d’un service numérique.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=1-8017-hebergement-le-domaine-de-lhebergement-se-struture-pour"
                           target="_blank"
                        >
                           Plus d'infos
                        </a>
                     </AccordionPanel>
                  </Accordion>
                  <Accordion>
                     <AccordionHeader>
                        5. Un site web en ligne 24h/24 ne consomme pas d'énergie tant qu'aucun utilisateur ne l'utilise.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p className={evaluatedAnswers[4] === "correct" ? "resTrue" : "resFalse"}>
                           Faux
                        </p>
                        <p className="mb-2">
                           Même sans trafic, les serveurs qui hébergent le site continuent de consommer de l’énergie pour maintenir le service actif.
                        </p>
                        <a className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/?famille=hebergement"
                           target="_blank">
                           Plus d'infos
                        </a>
                     </AccordionPanel>
                  </Accordion>
                  <Accordion>
                     <AccordionHeader>
                        6. Les services numériques contribuent peu aux émissions globales de gaz à effet de serre.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p className={evaluatedAnswers[5] === "correct" ? "resTrue" : "resFalse"}>
                           Faux
                        </p>
                        <p className="mb-2">
                           Le secteur du numérique représente environ 4% des émissions mondiales de gaz à effet de serre, un chiffre qui continue de croître.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://www.greenit.fr/etude-empreinte-environnementale-du-numerique-mondial/"
                           target="_blank"
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
                        <p className={evaluatedAnswers[6] === "correct" ? "resTrue" : "resFalse"}>
                           Vrai
                        </p>
                        <p className="mb-2">
                           Les animations et les vidéos en lecture automatique consomment
                           beaucoup de bande passante et nécessitent davantage de
                           puissance de traitement, ce qui augmente la consommation
                           d'énergie et donc l'empreinte carbone du site web.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=5-3029-uxui-des-elements/composants-visuels-sonores-et-tactiles-peuvent"
                           target="_blank"
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
                        <p className={evaluatedAnswers[7] === "correct" ? "resTrue" : "resFalse"}>
                           Vrai
                        </p>
                        <p className="mb-2">
                           Les frameworks légers nécessitent moins de ressources pour
                           être exécutés, réduisant ainsi l’énergie consommée par les
                           serveurs et les navigateurs, tout en maintenant des
                           performances optimales.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/crit.php?id=3-5019-frontend-bien-souvent-les-composants-issus-de-bibliotheques"
                           target="_blank"
                        >
                           Plus d'infos
                        </a>
                     </AccordionPanel>
                  </Accordion>
                  <Accordion>
                     <AccordionHeader>
                        9. L’utilisation du mode sombre sur les sites web réduit la consommation d’énergie sur tous les appareils.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p className={evaluatedAnswers[8] === "correct" ? "resTrue" : "resFalse"}>
                           Faux
                        </p>
                        <p className="mb-2">
                           Le mode sombre économise de l’énergie surtout sur les écrans OLED, mais l’impact est moindre sur les écrans LCD.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="#"
                           target="_blank"
                        >
                           Plus d'infos
                        </a>
                     </AccordionPanel>
                  </Accordion>
                  <Accordion>
                     <AccordionHeader>
                        10. Le recyclage des appareils électroniques permet de réduire les impacts négatifs du numérique sur l’environnement.
                     </AccordionHeader>
                     <AccordionPanel>
                        <p className={evaluatedAnswers[9] === "correct" ? "resTrue" : "resFalse"}>
                           Vrai
                        </p>
                        <p className="mb-2">
                           Recycler les appareils réduit la quantité de matières premières nécessaires à la fabrication de nouveaux équipements, limitant ainsi les impacts environnementaux.
                        </p>
                        <a
                           className="flex justify-self-end mb-3 cursor-pointer font-semibold text-custom-pink hover:text-custom-purple underline"
                           href="https://gr491.isit-europe.org/search.php?search=recyclage&go=Rechercher&famille=hebergement&inc="
                           target="_blank"
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
