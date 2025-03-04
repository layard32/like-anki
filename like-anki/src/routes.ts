import React from 'react';
import { RouteProps } from 'react-router-dom';
import DeckShow from './components/DeckShow';

interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
}

const routes: AppRoute[] = [
  {
    path: '/deck/:deckId',
    component: DeckShow,
  },
];

export default routes;