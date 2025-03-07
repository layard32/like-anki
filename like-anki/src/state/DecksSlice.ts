import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DeckModel from "../model/DeckModel";

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

        // TODO: SYNC CARDS
    },
});


// esporto reducer ed azioni
export const { addDeck, removeDeck, editDeck } = decksSlice.actions;
export default decksSlice.reducer;