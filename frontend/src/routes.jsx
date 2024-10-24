import HomePage from './pages/Home/HomePage';
import GamePage from './pages/Game/GamePage';
import ResultsPage from './pages/Results/ResultsPage';
import App from './App';

const routes = [
   {
      path: '/',
      element: <App />,
      children: [
         {
            index: true,
            element: <HomePage />
         },
         {
            path: 'game',
            element: <GamePage />
         },
         {
            path: 'results',
            element: <ResultsPage />
         }
      ]
   }
];

export default routes;