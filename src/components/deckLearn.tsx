import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import DeckModel from "../model/DeckModel";
import { useEffect } from "react";
import CardModel from "../model/CardModel";
import CardLearn from "./cardLearn";

const DeckLearn: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const id = Number(deckId);

  // prendo l'insieme delle cards e dei deck
  // poi il deck attuale e le card relative al deck attuale
  const Alldecks = useSelector((state: RootState) => state.decks.decks);
  const Allcards = useSelector((state: RootState) => state.cards.cards);
  const deck = Alldecks.find((deck: DeckModel) => deck.id === Number(deckId));
  const cards = deck
    ? (Allcards.filter((card) => card.deckId === deck.id) as CardModel[])
    : [];

  // se non ci sono learning cards o new cards, reindirizzo alla homepage
  const navigate = useNavigate();
  useEffect(() => {
    if (
      cards.filter((card) => card.status === "learning").length === 0 &&
      cards.filter((card) => card.status === "new").length === 0
    ) {
      navigate("/");
    }
  }, [cards]);

  return <CardLearn deckId={id} cards={cards} />;
};

export default DeckLearn;
