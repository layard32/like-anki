import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import DeckReducer from './hooks/DeckReducer';
import CardReducer from './hooks/CardReducer';
import { DeckProvider } from './context/DeckContext';
import { CardProvider } from './context/CardContext';

const App: React.FC = () => {
  // utilizzo react-router (nella v6) per la gestione delle routes
  // utilizzo i contesti per fornire a tutte le componenti decks, cards e relativi dispatch
  return (
    <div>
      <DeckProvider reducer={DeckReducer}>
        <CardProvider reducer={CardReducer}>
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component/>}/>
              ))}
            </Routes>
          </Router>
        </CardProvider>
      </DeckProvider>
    </div>
  );
}

export default App;