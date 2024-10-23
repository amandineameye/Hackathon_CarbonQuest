import homeImage from '../../assets/home.png';

const HomePage = () => {

   return (
      <>
         <main className="flex flex-1 py-4">
            <div className="container flex flex-col xl:flex-row gap-4">
               <div className="flex flex-col  w-full xl:w-1/2 bg-[#f5f8f6] rounded-lg justify-center py-10 px-10">
                  <h2>Carbon Quest, Quésako ?</h2>
                  <div>
                     <p className="pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a nisl est. Curabitur pellentesque in lectus eget aliquam. Aenean ante ex, hendrerit vel tortor ac, tempor mollis metus. Morbi luctus et felis nec lacinia.</p>
                     <h3>But du jeux</h3>
                     <p className="pb-4">
                        Integer ac lacinia eros, sit amet mollis erat. Sed eget libero eget quam ultrices mollis sit amet ut arcu. Nunc ut urna fringilla sapien fermentum finibus. Pellentesque vehicula pretium vulputate.
                     </p>
                     <h3>Comment jouer ?</h3>
                     <ul className="pb-4">
                        <li>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                     </ul>
                     <p className="pb-4">Arriveras-tu à ...</p>
                     <button className="flex text-md font-semibold bg-title hover:bg-text-light transition-200 rounded-lg text-white px-5 py-2 transition-200 mx-auto mt-8">Start Playing</button>
                  </div>
               </div>
               <div className="flex flex-col w-full xl:w-1/2">
                  <img src={homeImage} alt="" />
               </div>
            </div>
         </main>
      </>
   );
};

export default HomePage;