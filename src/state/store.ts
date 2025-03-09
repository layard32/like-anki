import { configureStore, combineReducers } from "@reduxjs/toolkit";
// importo i reducer definiti nella cartella state
import decksReducer from "./DecksSlice";
import cardsReducer from "./CardsSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // il default è localstorage

// configurazione per redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// creiamo un unico reducer, cosi da renderlo persist
const rootReducer = combineReducers({
  decks: decksReducer,
  cards: cardsReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// creazione dello store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// esportiamo il persistor ed i tipi usati per dispatch e stato
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;