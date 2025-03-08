import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DeckModel from "../model/DeckModel";
import CardModel from "../model/CardModel";

// per gestire la validazione aggiungo un campo error allo stato
// questo consente di gestire la validazione lato ui in modo più semplice
interface DecksState {
    decks: DeckModel[];
    error: string | null;
}

const initialState: DecksState = {
    decks: [],
    error: null,
};

const decksSlice = createSlice({
    name: "decks",
    initialState,
    reducers: {
        addDeck: (state, action: PayloadAction<string>) => {
            // validazione deck
            const deckName = action.payload.trim();
            if (deckName.length < 1 || deckName.length > 20) {
                state.error = "Deck name must be between 1 and 10 characters.";
                return;
            }
            if (state.decks.some(deck => deck.name === deckName)) {
                state.error = "Deck name must be unique.";
                return;
            }

            const newDeck: DeckModel = {
                id: state.decks.length > 0 ? state.decks[state.decks.length - 1].id + 1 : 1,
                name: deckName,
                completedCards: 0,
                learningCards: 0,
                newCards: 0,
            };
            state.decks.push(newDeck);
            state.error = null; 
        },

        removeDeck: (state, action: PayloadAction<number>) => {
            state.decks = state.decks.filter((deck) => deck.id !== action.payload);
            state.error = null; 
        },
        
        editDeck: (state, action: PayloadAction<{ id: number, text: string }>) => {
            // validazione
            const deckName = action.payload.text.trim();
            if (deckName.length < 1 || deckName.length > 20) {
                state.error = "Deck name must be between 1 and 20 characters.";
                return;
            }
            if (state.decks.some(deck => deck.name === deckName && deck.id !== action.payload.id)) {
                state.error = "Deck name must be unique.";
                return;
            }

            state.decks = state.decks.map((deck) => {
                if (deck.id === action.payload.id) return { ...deck, name: deckName };
                return deck;
            });
            state.error = null; 
        },

        syncCards: (state, action: PayloadAction<CardModel[]>) => {
            const cards = action.payload.filter((card) => state.decks.some((deck) => deck.id === card.deckId));
            state.decks.forEach((deck) => { 
                deck.newCards = cards.filter((card) => card.deckId === deck.id && card.status === 'new').length;
                deck.learningCards = cards.filter((card) => card.deckId === deck.id && card.status === 'learning').length;
                deck.completedCards = cards.filter((card) => card.deckId === deck.id && card.status === 'completed').length;
            });
            state.error = null; 
        },
    },
});

export const { addDeck, removeDeck, editDeck, syncCards } = decksSlice.actions;
export default decksSlice.reducer;