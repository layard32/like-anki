import React, { useEffect } from "react";
import Card from "./card";
import CardModel from "../model/CardModel";
import { updateCardAndSync } from "../state/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import ButtonAction from "./ui/buttonAction";
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

  // tengo traccia della card attuale e se la carta viene mostrata o meno
  const [currentCard, setCurrentCard] = React.useState<CardModel>(cards[0]);
  const [showAnswer, setShowAnswer] = React.useState(false);

  // se ci sono new cards, le metto per prime; altrimenti metto le learning cards
  useEffect(() => {
    if (newCards.length > 0) {
      setCurrentCard(newCards[0]);
    } else {
      setCurrentCard(learningCards[0]);
    }
    setShowAnswer(false);
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
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotateY: showAnswer ? 0 : 180 }}
            transition={{
              duration: 0.7,
              scale: { type: "spring", visualDuration: 0.1, bounce: 0.2 },
            }}
          >
            <motion.div
              className="card-content"
              transition={{ duration: 0.7 }}
              animate={{ rotateY: showAnswer ? 0 : 180 }}
              style={{
                backgroundColor:
                  currentCard.status === "new"
                    ? "rgba(0, 0, 255, 0.5)"
                    : "rgba(255, 0, 0, 0.5)",
              }}
            >
              <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: showAnswer ? 0 : 180 }}
                className="front"
              >
                {currentCard.answer}
              </motion.div>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: showAnswer ? 180 : 0 }}
                transition={{ duration: 0.7 }}
                className="back"
              >
                {currentCard.question}
              </motion.div>
            </motion.div>
          </motion.div>
        </Card>
      ) : null}

      <div className="mt-auto d-flex justify-content-center p-3">
        {showAnswer ? (
          <div>
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
        ) : (
          <button
            className="btn btn-primary me-3 btn-lg"
            onClick={() => setShowAnswer((prevState) => !prevState)}
          >
            Show answer
          </button>
        )}
      </div>
    </div>
  );
};

export default CardLearn;
