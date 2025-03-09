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
            if (state.cards.some(card => card.question === question && card.answer === answer && card.deckId === deckId)) {
                state.error = "Card with the same question and answer already exists.";
                return;
            }

            // l'id è incrementale rispetto le cards di un deck; perciò considero le cards di un deck
            const deckCards = state.cards.filter((card) => card.deckId === deckId);
            const newCard: CardModel = {
                id: deckCards.length > 0 ? deckCards[deckCards.length - 1].id + 1 : 1,
                question,
                answer,
                deckId,
                status: 'new',
            };
            state.cards.push(newCard);
            state.error = null;
        },

        removeCard: (state, action: PayloadAction<{id: number, deckId: number}>) => {
            state.cards = state.cards.filter((card) => !(card.id === action.payload.id && card.deckId === action.payload.deckId));
            state.error = null; 
        },
        
        editCard: (state, action: PayloadAction<{id: number, question: string, answer: string, deckId: number}>) => {
            // validazione
            const { id, deckId, question, answer } = action.payload;
            if (state.cards.some(card => card.deckId === deckId && card.question === question && card.answer === answer && card.id !== id)) {
                state.error = "Card with the same question and answer already exists.";
                return;
            }

            const card = state.cards.find((card) => card.id === id && card.deckId === deckId);
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

        updateStatusCard : (state, action: PayloadAction<{id: number, status: 'new' | 'completed' | 'learning', deckId: number}>) => {
            const { id, status, deckId } = action.payload;
            const card = state.cards.find((card) => card.id === id && card.deckId === deckId);
            if (card) card.status = status;
        }
    },
});

export const { addCard, removeCard, syncDecks, editCard, updateStatusCard } = cardsSlice.actions;
export default cardsSlice.reducer;