import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonAction from "./ui/buttonAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import DeckModel from "../model/DeckModel";
import CardModel from "../model/CardModel";
import CardEdit from "./CardEdit";
import CardList from "./CardList";

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
    <div className="d-flex gap-3">
      <div
        className="ms-3 w-100"
        style={{ maxWidth: "20%", minWidth: "210px" }}
      >
        <ButtonAction
          onClickAction={handleRedirectionToHomePage}
          text="Go back"
        />
        <div className="d-flex align-items-center gap-3">
          <div className="h4 wrap text-break">{deck.name}</div>
          <div className="h4 text-primary">{deck.newCards}</div>
          <div className="h4 text-danger">{deck.learningCards}</div>
          <div className="h4 text-success">{deck.completedCards}</div>
        </div>
        <div>
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
        </div>
      </div>
      <div
        className="vr"
        style={{
          minHeight: "100vh",
          minWidth: "4px",
          backgroundColor: "black",
          opacity: "0.6",
        }}
      >
        {" "}
      </div>
      {showedCard ? (
        <CardEdit cardId={showedCard.id} deckId={showedCard.deckId} />
      ) : null}
    </div>
  ) : null;
};

export default DeckEdit;
