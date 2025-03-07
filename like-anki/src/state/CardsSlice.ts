import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CardModel from "../model/CardModel";

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
        
        // TODO: EDIT ED ALTRE FUNZIONI
    },
});


// esporto reducer ed azioni
export const { addCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;