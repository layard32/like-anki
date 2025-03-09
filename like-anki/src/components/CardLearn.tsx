import React, { useEffect } from "react";
import Card from "./Card";
import CardModel from "../model/CardModel";
import { updateCardAndSync } from "../state/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import ButtonAction from "./ui/ButtonAction";
import { motion } from "framer-motion";

interface Props {
  cards: CardModel[];
  deckId: number;
}

const CardLearn: React.FC<Props> = ({ cards, deckId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // LOGICA LEARNING CARD

  // divido le cards in learning e new
  const learningCards = cards.filter((card) => card.status === "learning");
  const newCards = cards.filter((card) => card.status === "new");

  // tengo traccia della card attuale
  const [currentCard, setCurrentCard] = React.useState<CardModel>(cards[0]);

  // se ci sono new cards, le metto per prime; altrimenti metto le learning cards
  useEffect(() => {
    if (newCards.length > 0) {
      setCurrentCard(newCards[0]);
    } else {
      setCurrentCard(learningCards[0]);
    }
  }, [cards]);

  const handleOkButton = () => {
    // se clicco ok su una new card o una learning card, questa diventa completed
    if (currentCard.status === "new" || currentCard.status === "learning") {
      dispatch(
        updateCardAndSync({
          id: currentCard.id,
          status: "completed",
          deckId: Number(deckId),
        })
      );
    }
  };

  const handleNotOkButton = () => {
    // se clicco not ok su una new card o una learning card, questa diventa learning
    if (currentCard.status === "new" || currentCard.status === "learning") {
      dispatch(
        updateCardAndSync({
          id: currentCard.id,
          status: "learning",
          deckId: Number(deckId),
        })
      );
    }
  };

  return (
    <div>
      <ButtonAction onClickAction={() => navigate("/")} text="Go back" />

      {currentCard ? (
        <Card cardId={currentCard.id}>
          <motion.div
            className="card-container"
            layout
            key={currentCard.id}
            style={{ width: "100%" }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              scale: { type: "spring", visualDuration: 0.1, bounce: 0.2 },
            }}
          >
            <div
              className="card-content"
              style={{
                backgroundColor:
                  currentCard.status === "new"
                    ? "rgba(0, 0, 255, 0.5)"
                    : "rgba(255, 0, 0, 0.5)",
              }}
            >
              <div className="card-body">
                <div className="h3"> Question </div>
                <div className="h4"> {currentCard.question} </div>
                <hr />
                <div className="h3"> Answer </div>
                <div className="h4"> {currentCard.answer} </div>
              </div>
            </div>
          </motion.div>
        </Card>
      ) : null}

      <div className="mt-auto d-flex justify-content-center p-3">
        <button
          className="btn btn-primary me-3 btn-lg"
          onClick={handleOkButton}
        >
          Ok
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={handleNotOkButton}
        >
          Not ok
        </button>
      </div>
    </div>
  );
};

export default CardLearn;
