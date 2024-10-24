import { Outlet } from 'react-router-dom';
import Footer from './containers/Footer/Footer';
import Header from './containers/Header/Header';

function App() {

   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
}

export default App;
