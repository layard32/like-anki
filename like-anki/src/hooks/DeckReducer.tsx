import React from 'react';
import DeckModel from '../model/DeckModel';
import CardModel from '../model/CardModel';

type DeckAction = 
    | { type: 'ADD-DECK', payload: {name: string, id: number} }
    | { type: 'REMOVE-DECK', payload: number }
    | { type: 'EDIT-DECK', payload: { id: number, text: string } }
    | { type: 'ADD-CARD-TO-DECK', payload: { id: number, card: CardModel } }
    | { type: 'REMOVE-CARD-FROM-DECK', payload: { deckId: number, cardId: number } }
    | { type: 'UPDATE-CARD-STATUS', payload: { deckId: number, cardId: number, status: 'new' | 'learning' | 'completed' } }
    | { type: 'SET-DECKS', payload: DeckModel[] };

// la funzione aggiorna i contatori delle carte di un deck in certe azioni
const updateCardCounts = (deck: DeckModel): DeckModel => {
    return {
        ...deck,
        newCards: deck.cards.filter(card => card.status === 'new').length,
        learningCards: deck.cards.filter(card => card.status === 'learning').length,
        completedCards: deck.cards.filter(card => card.status === 'completed').length,
    };
};

const DeckReducer = (state: DeckModel[], action: DeckAction): DeckModel[] => {
    switch (action.type) {
        case 'ADD-DECK':
            return [
                ...state, 
                { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    completedCards: 0, 
                    learningCards: 0, 
                    newCards: 0, 
                    cards: [] 
                }
            ];
        case 'REMOVE-DECK':
            return state.filter((deck) => deck.id !== action.payload);
        case 'EDIT-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: action.payload.text };
                return deck;
            });
        case 'ADD-CARD-TO-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.id) {
                    const updatedDeck = { ...deck, cards: [...deck.cards, action.payload.card] };
                    return updateCardCounts(updatedDeck);
                }
                return deck;
            });
        case 'REMOVE-CARD-FROM-DECK':
            return state.map((deck) => {
                if (deck.id === action.payload.deckId) {
                    const updatedDeck = { ...deck, cards: deck.cards.filter(card => card.id !== action.payload.cardId) };
                    return updateCardCounts(updatedDeck);
                }
                return deck;
            });
        case 'UPDATE-CARD-STATUS':
            return state.map((deck) => {
                if (deck.id === action.payload.deckId) {
                    const updatedDeck = { 
                        ...deck, 
                        cards: deck.cards.map(card => 
                            card.id === action.payload.cardId ? { ...card, status: action.payload.status } : card
                        )
                    };
                    return updateCardCounts(updatedDeck);
                }
                return deck;
            });
        case 'SET-DECKS':
            return action.payload;
        default:
            return state;
    }
};

export default DeckReducer;