import React from "react";
import { useParams } from "react-router-dom";
import ButtonAction from "./ui/buttonAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import DeckModel from "../model/DeckModel";
import CardModel from "../model/CardModel";
import CardEdit from "./cardEdit";
import CardList from "./cardList";
import { ModeToggle } from "./mode-toggle";

const DeckEdit: React.FC = () => {
  // utilizzo l'useParams hook per prendere il parametro della nested route
  const { deckId } = useParams<{ deckId: string }>();

  // gestione reindirizzazione alla homepage
  const navigate = useNavigate();
  const handleRedirectionToHomePage = () => {
    navigate("/");
  };

  // prendo l'insieme dei deck e il deck attuale
  const decks = useSelector((state: RootState) => state.decks.decks);
  const deck = decks.find((deck: DeckModel) => deck.id === Number(deckId));

  // click destro porta all'apertura della card nella parte destra
  // la carta viene passata anche a cardlist, affinché questa venga evidenziata
  const [showedCard, setShowedCard] = React.useState<CardModel>();
  const handleLeftClick = (card: CardModel) => {
    setShowedCard(card);
  };

  // prendo l'insieme delle cards dallo store
  const cards = useSelector((state: RootState) => state.cards.cards);

  return deck ? (
    <div>
      <div className="fixed top-11 left-3 z-1">
        <ModeToggle />
      </div>

      <div className="text-center mt-12 w-full">
        <ButtonAction
          onClickAction={handleRedirectionToHomePage}
          text="Go back to the homepage"
          className="text-[min(5vw,1.26rem)]"
        />{" "}
      </div>

      <div className="flex mt-40 ml-3">
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 mb-4">
            <div className="text-[min(5vw,1.5rem)] font-bold">{deck.name}</div>
            <div className="text-[min(5vw,1.5rem)] font-bold text-primary">
              {deck.newCards}
            </div>
            <div className="text-[min(5vw,1.5rem)] font-bold text-destructive">
              {deck.learningCards}
            </div>
            <div className="text-[min(5vw,1.5rem)] font-bold text-chart-2">
              {deck.completedCards}
            </div>
          </div>

          {cards
            .filter((card) => card.deckId === deck.id)
            .map((card) => (
              <CardList
                key={card.id}
                card={card}
                handleLeftClick={handleLeftClick}
                selectedCard={showedCard}
              />
            ))}
        </div>{" "}
        {showedCard ? (
          <CardEdit cardId={showedCard.id} deckId={showedCard.deckId} />
        ) : null}
      </div>
    </div>
  ) : null;
};

export default DeckEdit;
