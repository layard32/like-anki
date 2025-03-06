import React from 'react';
import DeckModel from '../model/DeckModel';
import CardModel from '../model/CardModel';

type DeckAction = 
    | { type: 'ADD-DECK', payload: string }
    | { type: 'REMOVE-DECK', payload: number }
    | { type: 'EDIT-DECK', payload: { id: number, text: string } }
    | { type: 'INIT', payload: DeckModel[] }
    | { type: 'SYNC-CARDS', payload: CardModel[] }

const DeckReducer = (state: DeckModel[], action: DeckAction): DeckModel[] => {
    switch (action.type) {
        case 'ADD-DECK':
            return [
                ...state, 
                { 
                    id: state.length > 0 ? state[state.length - 1].id + 1 : 1, 
                    name: action.payload, 
                    completedCards: 0, 
                    learningCards: 0, 
                    newCards: 0, 
                }
            ];
        case 'REMOVE-DECK':
            return state.filter((deck) => deck.id !== action.payload);
        case 'EDIT-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: action.payload.text };
                return deck;
            });
        case 'INIT':
            return action.payload;
        case 'SYNC-CARDS':
            return state.map((deck) => {
                const cardsOfDeck = action.payload.filter((card) => card.deckId === deck.id);
                const completedCards = cardsOfDeck.filter((card) => card.status === 'completed').length;
                const learningCards = cardsOfDeck.filter((card) => card.status === 'learning').length;
                const newCards = cardsOfDeck.filter((card) => card.status === 'new').length;
                return { ...deck, completedCards: completedCards, learningCards: learningCards, newCards: newCards };
            });
        default:
            return state;
    }
};

export default DeckReducer;