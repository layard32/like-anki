import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
// importo il provider (per collegamento tra redux e react)
// e lo store stesso di redux
import { store, persistor } from './state/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  // utilizzo react-router (nella v6) per la gestione delle routes
  return (
    <div>
        <Provider store={store}> 
          <PersistGate loading={null} persistor={persistor}> 
            <Router>
                <Routes>
                  {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                  ))}
                </Routes>
              </Router>
          </PersistGate>
        </Provider>
    </div>
  );
}

export default App;