import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CardModel from "../model/CardModel";
import DeckModel from "../model/DeckModel";

// per gestire la validazione aggiungo un campo error allo stato
// questo consente di gestire la validazione lato ui in modo più semplice
interface CardsState {
    cards: CardModel[];
    error: string | null;
}

const initialState: CardsState = {
    cards: [],
    error: null,
};

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<{question: string, answer: string, deckId: number}>) => {
            // validazione
            const { question, answer, deckId } = action.payload;
            if (state.cards.some(card => card.question === question && card.answer === answer)) {
                state.error = "Card with the same question and answer already exists.";
                return;
            }

            const newCard: CardModel = {
                id: state.cards.length > 0 ? state.cards[state.cards.length - 1].id + 1 : 1,
                question,
                answer,
                deckId,
                status: 'new',
            };
            state.cards.push(newCard);
            state.error = null;
        },

        removeCard: (state, action: PayloadAction<number>) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
            state.error = null; 
        },
        
        editCard: (state, action: PayloadAction<{id: number, question: string, answer: string}>) => {
            // validazione
            const { id, question, answer } = action.payload;
            if (state.cards.some(card => card.question === question && card.answer === answer && card.id !== id)) {
                state.error = "Card with the same question and answer already exists.";
                return;
            }

            const card = state.cards.find((card) => card.id === id);
            if (card) {
                card.question = question;
                card.answer = answer;
                state.error = null; 
            }
        },

        syncDecks: (state, action: PayloadAction<DeckModel[]>) => {
            state.cards = state.cards.filter((card) => action.payload.some((deck) => deck.id === card.deckId));
            state.error = null; 
        },
    },
});

export const { addCard, removeCard, syncDecks, editCard } = cardsSlice.actions;
export default cardsSlice.reducer;