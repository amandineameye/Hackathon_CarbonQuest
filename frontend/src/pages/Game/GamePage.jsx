// import { Unity, useUnityContext } from "react-unity-webgl";
// import { useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const GamePage = () => {
//   const { unityProvider, addEventListener, removeEventListener } =
//     useUnityContext({
//       loaderUrl: "../game/Build/build.loader.js",
//       frameworkUrl: "../game/Build/build.framework.js",
//       dataUrl: "../game/Build/build.data",
//       codeUrl: "../game/Build/build.wasm",
//     });
//   const navigate = useNavigate();

//   const location = useLocation();
//   const username = location.state?.username;

//   const handleEndGame = useCallback(
//     async (score, answers) => {
//       console.log("La partie est finie. Le score est de " + score);
//       console.log(
//         "Réponses du joueur :" +
//           (answers?.length ? answers.join(",") : "aucune")
//       );
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}/game`,
//           { score, username },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.status === 200) {
//           console.log("Le score a bien été envoyé à l'API.");
//         } else {
//           console.error("L'envoi du score à l'API a échoué.");
//         }
//       } catch (error) {
//         console.error("Erreur lors de l'envoi du score à l'API:", error);
//       }
//       navigate("/results", { state: { score, answers, username } });
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     addEventListener("ButtonClicked", handleEndGame);
//     return () => {
//       removeEventListener("ButtonClicked", handleEndGame);
//     };
//   }, [addEventListener, removeEventListener, handleEndGame]);

//   return (
//     <>
//       <main className="flex-1">
//         <div className="container py-10 flex justify-center">
//           <Unity
//             style={{ width: 1200, height: 700 }}
//             unityProvider={unityProvider}
//           />
//         </div>
//       </main>
//     </>
//   );
// };

// export default GamePage;


import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GamePage = () => {
  const { unityProvider, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "../game/Build/build.loader.js",
      frameworkUrl: "../game/Build/build.framework.js",
      dataUrl: "../game/Build/build.data",
      codeUrl: "../game/Build/build.wasm",
    });
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const handleEndGame = useCallback(
    async (score, answers) => {
      console.log("La partie est finie. Le score est de " + score);
      console.log(
        "Réponses du joueur :" +
          (answers?.length ? answers.join(",") : "aucune")
      );
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/game`,
          { score, username },
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
      navigate("/results", { state: { score, answers, username } });
    },
    [navigate, username]
  );

  // Test de requête POST au montage avec score = 10
  useEffect(() => {
    const testPostRequest = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/game`,
          { score: 10, username: username || "TestUser" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Requête de test : Le score a bien été envoyé à l'API.");
        } else {
          console.error("Requête de test : L'envoi du score à l'API a échoué.");
        }
      } catch (error) {
        console.error("Requête de test : Erreur lors de l'envoi du score à l'API:", error);
      }
    };

    testPostRequest();
  }, [username]);

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
