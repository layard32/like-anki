import React from 'react'
import CardModel from '../model/CardModel';

type ActionType = 
    | { type: 'ADD-CARD', payload: CardModel }
    | { type: 'REMOVE-CARD', payload: number }
    | { type: 'EDIT-CARD', payload: { id:number, question: string, answer: string, status: 'new' | 'learning' | 'completed', deckId: number } }
    | { type: 'CHANGE-STATUS-CARD', payload: { id:number, status: 'new' | 'learning' | 'completed' } }
    | { type: 'INIT', payload: CardModel[] };

const CardReducer = (state: CardModel[], action: ActionType): CardModel[] => {
    switch (action.type) {
        case 'ADD-CARD':
            return [...state, action.payload];
        case 'REMOVE-CARD':
            return state.filter((card) => card.id !== action.payload);
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
        case 'INIT':
            return action.payload;
        default:
            return state;
    }
};

export default CardReducer;