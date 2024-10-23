import { FaHeart } from 'react-icons/fa';

const Footer = () => {
   return (
      <>
         <footer className="bg-custom-green p-2">
            <div className="container py-4 flex justify-center items-center">
               <p className="inline-flex align-center text-white">© 2024 - Carbon Quest | All rights reserved •
                  Made with <FaHeart className="text-custom-blue mx-2 mt-1" /> by the Carbon Quest team</p>
            </div>
         </footer>
      </>
   );
};

export default Footer;