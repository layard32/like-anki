import { z } from "zod";
import { store } from "@/state/store"; 

const isQuestionAndAnswerUnique = (question: string, answer: string, deckId: number) => {
    const state = store.getState();
    return !state.cards.cards.some((card) => card.question === question && card.answer === answer && card.deckId === deckId);
};

export const cardSchema = z.object({
    question: z
        .string()
        .min(1, "Question must be at least 1 character")
        .max(100, "Question must be at most 100 characters"),
    answer: z
        .string()
        .min(1, "Answer must be at least 1 character")
        .max(100, "Answer must be at most 100 characters"),
    deckId: z
        .number()
        .min(1, "Deck must be selected")
}).refine((data) => isQuestionAndAnswerUnique(data.question, data.answer, data.deckId), {
    message: "A card with the same question and answer already exists in this deck",
    path: ["deckId"]
});