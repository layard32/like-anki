import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CardModel from "../model/CardModel";
import DeckModel from "../model/DeckModel";

const initialState: CardModel[] = [];

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        // possiamo scrivere codice mutabile perché redux lo rende immutabile
        // (quindi non c'è bisogno di fare map)

        addCard: (state, action: PayloadAction<{question: string, answer: string, deckId: number}>) => {
            const newCard: CardModel = {
                id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
                question: action.payload.question,
                answer: action.payload.answer,
                deckId: action.payload.deckId,
                status: 'new',
            };
            state.push(newCard);
        },

        removeCard: (state, action: PayloadAction<number>) => {
            return state.filter((card) => card.id !== action.payload);
        },
        
        editCard: (state, action: PayloadAction<{id: number, question: string, answer: string}>) => {
            const card = state.find((card) => card.id === action.payload.id);
            if (card) {
                card.question = action.payload.question;
                card.answer = action.payload.answer;
            }
        },

        syncDecks: (state, action: PayloadAction<DeckModel[]>) => {
            // elimino le carte relative a deck non più esistenti
            return state.filter((card) => action.payload.some((deck) => deck.id === card.deckId));
        },
    },
});


// esporto reducer ed azioni
export const { addCard, removeCard, syncDecks, editCard } = cardsSlice.actions;
export default cardsSlice.reducer;