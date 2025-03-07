import { configureStore } from "@reduxjs/toolkit";
// importo i reducer definiti nella cartella state
import decksReducer from "./DecksSlice";
import cardsReducer from "./CardsSlice";

// creazione dello store
export const store = configureStore({
  reducer: {
    decks: decksReducer,
    cards: cardsReducer
  },
});

// il tipo del return di store.getState: serve per tipizzare useSelector, 
// usato nel momento in cui accediamo allo store
export type RootState = ReturnType<typeof store.getState>;
// esportiamo anche il tipo del dispatch
export type AppDispatch = typeof store.dispatch;