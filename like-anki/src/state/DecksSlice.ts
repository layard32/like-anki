import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DeckModel from "../model/DeckModel";
import CardModel from "../model/CardModel";

const initialState: DeckModel[] = [];

const decksSlice = createSlice({
    name: "decks",
    initialState,
    reducers: {
        // possiamo scrivere codice mutabile perché redux lo rende immutabile
        // (quindi non c'è bisogno di fare map)

        addDeck: (state, action: PayloadAction<string>) => {
            const newDeck: DeckModel = {
                id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
                name: action.payload,
                completedCards: 0,
                learningCards: 0,
                newCards: 0,
            };
            state.push(newDeck);
        },

        removeDeck: (state, action: PayloadAction<number>) => {
            return state.filter((deck) => deck.id !== action.payload);
        },
        
        editDeck: (state, action: PayloadAction<{ id: number, text: string }>) => {
            return state.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: action.payload.text };
                return deck;
            });
        },

        syncCards: (state, action: PayloadAction<CardModel[]>) => {
            // considero solo le carte relative al deck
            const cards = action.payload.filter((card) => state.some((deck) => deck.id === card.deckId));
            // aggiorno il numero di carte per ogni deck
            state.forEach((deck) => { 
                deck.newCards = cards.filter((card) => card.deckId === deck.id && card.status === 'new').length;
                deck.learningCards = cards.filter((card) => card.deckId === deck.id && card.status === 'learning').length;
                deck.completedCards = cards.filter((card) => card.deckId === deck.id && card.status === 'completed').length;
            }
            );
        },
    },
});


// esporto reducer ed azioni
export const { addDeck, removeDeck, editDeck, syncCards } = decksSlice.actions;
export default decksSlice.reducer;