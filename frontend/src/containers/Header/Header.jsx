import { useNavigate } from "react-router-dom";

const Header = () => {


   const navigate = useNavigate();

   
   const handleClick = () => {
      navigate("/");
   }

   return (
      <>
         <header className="shadow-lg top-0 left-0 w-full z-10 bg-custom-green">
            <div className="container py-4 flex justify-between items-center">
               <div onClick={handleClick} className="font-logo text-custom-blue text-2xl sm:text-3xl">
                  Carbon Quest
               </div>
              
            </div>
         </header>
         
      </>
   );
};

export default Header;
