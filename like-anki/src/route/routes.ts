import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../Home';
import DeckLearn from '../components/DeckLearn';
import DeckCards from '../components/DeckCards';
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
        component: DeckCards,
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