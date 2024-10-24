import { Unity, useUnityContext } from "react-unity-webgl";

const GamePage = () => {

   const { unityProvider } = useUnityContext({
      loaderUrl: "../game/Build/build.loader.js",
      frameworkUrl: "../game/Build/build.framework.js",
      dataUrl: "../game/Build/build.data",
      codeUrl: "../game/Build/build.wasm",
   });

   return (
      <>
         <main className="flex-1">
            <div className="container py-10 flex justify-center">
               <Unity style={{ width: 1200, height: 700 }} unityProvider={unityProvider} />
            </div>
         </main>
      </>

   );
};

export default GamePage;