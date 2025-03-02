import React from 'react'
import CardModel from '../model/CardModel';

type ActionType = 
    | { type: 'ADD-CARD', payload: { id: number, question: string, answer: string, status: 'new' | 'learning' | 'completed', deckId: number } }
    | { type: 'REMOVE-CARD', payload: { id: number } }
    | { type: 'EDIT-CARD', payload: { id: number, question: string, answer: string, status: 'new' | 'learning' | 'completed', deckId: number } }
    | { type: 'CHANGE-STATUS-CARD', payload: { id: number, status: 'new' | 'learning' | 'completed' } };

const CardReducer = (state: CardModel[], action: ActionType) => {
    switch (action.type) {
        case 'ADD-CARD':
            return [...state, {id: Math.random(), question: action.payload.question, answer: action.payload.answer, status: action.payload.status, deckId: action.payload.deckId}];
        case 'REMOVE-CARD':
            return state.filter((card) => card.id !== action.payload.id);
        case 'EDIT-CARD':
            return state.map((card) => {
                if (card.id === action.payload.id) return { ...card, question: action.payload.question, answer: action.payload.answer };
                return card;
            });
        case 'CHANGE-STATUS-CARD':
            return state.map((card) => {
                if (card.id === action.payload.id) return { ...card, status: action.payload.status };
                return card;
            })
        default:
            return state;
    }
};

export default CardReducer;