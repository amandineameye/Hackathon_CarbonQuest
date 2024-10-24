import { Link } from 'react-router-dom';

const Header = () => {

   return (
      <>
         <header className="shadow-lg top-0 left-0 w-full z-10 bg-custom-green">
            <div className="container py-4 flex justify-between items-center">
               <Link to="/">
                  <div className="font-logo text-custom-blue text-2xl sm:text-3xl">Carbon Quest</div>
               </Link>
            </div>
         </header>
      </>
   );
};

export default Header;
