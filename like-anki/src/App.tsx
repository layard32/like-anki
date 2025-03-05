import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  // utilizzo react-router (nella v6) per la gestione delle routes
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component/>}/>
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;