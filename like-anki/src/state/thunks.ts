import { AppDispatch, RootState } from './store';
import { addCard, removeCard, syncDecks } from './CardsSlice';
import { removeDeck, syncCards } from './DecksSlice';
import CardModel from '../model/CardModel';

// aggiunta carta -> sincronizzazione deck
export const addCardAndSync = (card: Omit<CardModel, 'id' | 'status'>) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(addCard(card));
        const state = getState();
        dispatch(syncCards(state.cards.cards));
    };
};

// rimozione carta -> sincronizzazione deck
export const removeCardAndSync = (cardId: number) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(removeCard(cardId));
        const state = getState();
        dispatch(syncCards(state.cards.cards));
    };
};

// rimozione deck -> sincronizzazione cards
export const removeDeckAndSync = (deckId: number) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(removeDeck(deckId));
        const state = getState();
        dispatch(syncDecks(state.decks.decks));
    };
};