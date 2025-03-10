import { z } from "zod";
import { store } from "@/state/store"; // Adjust the import path as needed

const isUniqueDeckName = (deckName: string) => {
  const state = store.getState();
  return !state.decks.decks.some((deck) => deck.name === deckName);
};

export const deckSchema = z.object({
  deckName: z
    .string()
    .min(1, "Deck must be at least 1 character")
    .max(20, "Deck must be at most 20 characters")
    .refine(isUniqueDeckName, "Deck name must be unique"),
});