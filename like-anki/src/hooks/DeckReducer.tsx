import React from 'react'
import DeckModel from '../model/DeckModel'
import CardModel from '../model/CardModel';

type DeckAction = 
    | { type: 'ADD-DECK', payload: string }
    | { type: 'REMOVE-DECK', payload: number }
    | { type: 'EDIT-DECK', payload: { id: number, text: string} }
    | { type: 'ADD-CARD-TO-DECK', payload: {id: number, card: CardModel} };

const DeckReducer = (state: DeckModel[], action: DeckAction) => {
    switch (action.type) {
        case 'ADD-DECK':
            return [...state, {id: Math.floor(Math.random() * 100) + 1, name: action.payload, completedCards: 0, learningCards: 0, newCards: 0, cards: []}];        case 'REMOVE-DECK':
            return state.filter((deck) => deck.id !== action.payload);
        case 'EDIT-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: action.payload.text };
                return deck;
            });
        case 'ADD-CARD-TO-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) {
                    deck.cards.push(action.payload.card);
                    return deck;
                }
                return deck;
            });
        default:
            return state;
    } 
};

export default DeckReducer;