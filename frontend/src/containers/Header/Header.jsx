import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';

const Header = () => {

   const [isAuthModalVisible, setIsAuthModalVisible] = useState(false); // AuthModal visibility state
   const [authModalType, setAuthModalType] = useState('login'); // Either 'login' or 'signup'

   const handleLoginModal = (e) => {
      e.preventDefault();
      setAuthModalType('login');
      setIsAuthModalVisible(true);
   };

   const handleSignUpModal = (e) => {
      e.preventDefault();
      setAuthModalType('signup');
      setIsAuthModalVisible(true);
   };

   const closeAuthModal = () => {
      setIsAuthModalVisible(false);
   };

   const switchToLogin = () => {
      setAuthModalType('login');
   };

   const switchToSignup = () => {
      setAuthModalType('signup');
   };

   return (
      <>
         <header className="shadow-lg top-0 left-0 w-full z-10 bg-custom-green">
            <div className="container py-4 flex justify-between items-center">
               <div className="font-title text-custom-blue text-2xl sm:text-3xl">Carbon Quest</div>
               <nav className="flex justify-between items-center">
                  <ul className="flex items-center gap-4">
                     <li><a href="#" onClick={handleLoginModal} className="text-lg font-medium bg-custom-yellow hover:bg-custom-light-yellow rounded-xl text-title hover:text-black p-3 transition-200">Log in</a></li>
                     <li><a href="#" onClick={handleSignUpModal} className="text-lg font-medium text-title hover:text-black px-2 py-4">Sign up</a></li>
                  </ul>
               </nav>
            </div>
         </header>

         <AuthModal
            visible={isAuthModalVisible}
            modalType={authModalType}
            onClose={closeAuthModal}
            switchToLogin={switchToLogin}
            switchToSignup={switchToSignup}
         />
      </>
   );
};

export default Header;