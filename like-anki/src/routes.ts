import React from 'react';
import DeckShow from './components/DeckShow';
import Home from './Home';

interface AppRoute {
    path: string;
    component: React.ComponentType<any>;
}

// definiamo l'insieme delle rotte, con path l'url e component la relativa componente
const routes: AppRoute[] = [
    { 
        path: '/',
        component: Home,
    },
    {
        path: '/deck/:deckId',
        component: DeckShow,
    }
];

export default routes;