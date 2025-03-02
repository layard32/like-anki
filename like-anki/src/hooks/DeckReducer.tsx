import React from 'react'
import DeckModel from '../model/DeckModel'

type DeckAction = 
    | { type: 'ADD-DECK', payload: string }
    | { type: 'REMOVE-DECK', payload: number }
    | { type: 'EDIT-DECK', payload: { id: number, text: string} }

const DeckReducer = (state: DeckModel[], action: DeckAction) => {
    switch (action.type) {
        case 'ADD-DECK':
            return [...state, {id: Math.random(), name: action.payload, completedCards: 0, learningCards: 0, newCards: 0, cards: []}];  
        case 'REMOVE-DECK':
            return state.filter((deck) => deck.id !== action.payload);
        case 'EDIT-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: action.payload.text };
                return deck;
            });
        default:
            return state;
    } 
}

export default DeckReducer