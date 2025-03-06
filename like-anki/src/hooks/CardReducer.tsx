import React from 'react'
import CardModel from '../model/CardModel';
import DeckModel from '../model/DeckModel';

type ActionType = 
    | { type: 'ADD-CARD', payload: { question: string, answer: string, deckId: number} }
    | { type: 'REMOVE-CARD', payload: number }
    | { type: 'EDIT-CARD', payload: { id:number, question: string, answer: string, status: 'new' | 'learning' | 'completed', deckId: number } }
    | { type: 'CHANGE-STATUS-CARD', payload: { id:number, status: 'new' | 'learning' | 'completed' } }
    | { type: 'INIT', payload: CardModel[] }
    | { type: 'SYNC-DECKS', payload: DeckModel[] }

const CardReducer = (state: CardModel[], action: ActionType): CardModel[] => {
    switch (action.type) {
        case 'ADD-CARD':
            return [
                ...state, 
                { 
                    id: state.length > 0 ? state[state.length - 1].id + 1 : 1, 
                    question: action.payload.question,
                    answer: action.payload.answer,
                    deckId: action.payload.deckId,
                    status: 'new'
                    }
            ];
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
        case 'SYNC-DECKS':
            return state.filter((card) => {
                return action.payload.some((deck) => deck.id === card.deckId);
            });
        default:
            return state;
    }
};

export default CardReducer;