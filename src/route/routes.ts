import React from 'react';
import Home from '../Home';
import DeckLearn from '../components/deckLearn';
import DeckEdit from '../components/deckEdit';
import RedirectHome from './RedirectHome';

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
        path: '/deck/:deckId/cards',
        component: DeckEdit,
    },
    {
        path: '/deck/:deckId/learn',
        component: DeckLearn,
    },
    {
        // catch per gestire tutte le path invalide
        path: "*",
        component: RedirectHome,
    }
];

export default routes;