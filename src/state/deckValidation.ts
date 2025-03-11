import { z } from "zod";
import { store } from "@/state/store"; 

const isUniqueDeckName = (deckName: string, currentDeckId?: number) => {
  const state = store.getState();
  return !state.decks.decks.some((deck) => deck.name === deckName && deck.id !== currentDeckId);
};

export const deckSchema = (currentDeckId?: number) => z.object({
  deckName: z
    .string()
    .min(1, "Deck must be at least 1 character")
    .max(20, "Deck must be at most 20 characters")
    .refine((deckName) => isUniqueDeckName(deckName, currentDeckId), "Deck name must be unique"),
});