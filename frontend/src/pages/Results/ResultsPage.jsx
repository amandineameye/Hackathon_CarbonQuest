const ResultsPage = () => {

   //? Pour tester
   // Si le score est entre 0 et 4 --> Nouveau-né du Green IT, tu commences à décourvir le sujet.
   // Si le score est 5 --> Apprenti Écoresponsable, tu es en bonne voie mais il te reste des progrès à faire.
   // Si le score est entre 6 et 8 --> Éco-Explorateur, tu maîtrise bien les bases du Green IT.
   // Si le score est entre 9 et 10 (inclus) --> Green IT Guru, tu excelles le sujet !

   const score = 6;
   const question = '';
   const RealAnswer = '';
   const GamerAnswer = '';
   const link = '';

   const result = () => {
      switch (true) {
         case score <= 4:
            return (
               <div>
                  <h3 className="bg-[#f3d7d5] p-1 rounded-sm">Nouveau-né du Green IT</h3>
                  <p className="text-lg">Tu commences à décourvir le sujet.</p>
                  <div className="mt-4 rounded-full mx-auto bg-custom-pink w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">{score}</div>
               </div>
            );
         case score === 5:
            return (
               <div>
                  <h3 className="bg-[#c1ada8] p-1 rounded-sm">Apprenti Écoresponsable</h3>
                  <p>Tu es en bonne voie mais il te reste des progrès à faire.</p>
                  <div className="mt-4 rounded-full mx-auto bg-custom-purple w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">{score}</div>
               </div>
            );
         case score >= 6 && score <= 8:
            return (
               <div>
                  <h3 className="bg-[#dfe8ae] p-1 rounded-sm">Éco-Explorateur</h3>
                  <p>Tu maîtrise bien les bases du Green IT.</p>
                  <div className="mt-4 rounded-full mx-auto bg-custom-yellow w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">{score}</div>
               </div>
            );
         case score >= 9 && score <= 10:
            return (
               <div>
                  <h3 className="bg-[#d5e5cd] p-1 rounded-sm">Green IT Guru</h3>
                  <p>Tu excelles le sujet !</p>
                  <div className="mt-4 rounded-full mx-auto bg-custom-light-green w-20 h-20 flex items-center justify-center text-white text-4xl font-bold">{score}</div>
               </div>
            );
         default:
            return <div>Erreur : score non valide</div>;
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
            <div className="container">

            </div>
         </main>
      </>
   );
};

export default ResultsPage;