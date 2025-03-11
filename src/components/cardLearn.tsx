import React, { useEffect } from "react";
import Card from "./card";
import CardModel from "../model/CardModel";
import { updateCardAndSync } from "../state/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

interface Props {
  cards: CardModel[];
  deckId: number;
}

const CardLearn: React.FC<Props> = ({ cards, deckId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
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

  // gestione reindirizzazione alla homepage
  const navigate = useNavigate();
  const handleRedirectionToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-11 left-3 z-1">
        <ModeToggle />
      </div>

      <div className="text-center mt-12 w-full">
        <Button
          onClick={handleRedirectionToHomePage}
          value=""
          className="text-[min(5vw,1.26rem)]"
        >
          {" "}
          Go back to the homepage{" "}
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] ">
        <div className="flex flex-col items-center justify-center">
          {currentCard ? (
            <Card cardId={currentCard.id}>
              <motion.div
                className="w-[min(550px,57vw)] items-center mx-auto"
                layout
                key={currentCard.id}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: showAnswer ? 0 : 180,
                }}
                transition={{
                  duration: 0.7,
                  scale: { type: "spring", visualDuration: 0.1, bounce: 0.2 },
                }}
              >
                <div
                  className={`rounded-lg shadow-md p-14 text-[min(5vw,1.26rem)] font-bold break-words w-full ${
                    currentCard.status === "new" ? "bg-blue-400" : "bg-red-500"
                  }`}
                >
                  <motion.div
                    className="card-content"
                    transition={{ duration: 0.7 }}
                    animate={{ rotateY: showAnswer ? 0 : 180 }}
                  >
                    <div className="relative w-full h-full">
                      <motion.div
                        transition={{ duration: 0.7 }}
                        animate={{ rotateY: showAnswer ? 0 : 180 }}
                        className={
                          "backface-hidden absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                        }
                      >
                        {currentCard.answer}
                      </motion.div>
                      <motion.div
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: showAnswer ? 180 : 0 }}
                        transition={{ duration: 0.7 }}
                        className={
                          "backface-hidden absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                        }
                      >
                        {currentCard.question}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          ) : null}

          <div className="flex justify-center mt-10">
            {showAnswer ? (
              <div className="flex space-x-4">
                <Button
                  size={"lg"}
                  variant={"default"}
                  onClick={handle}
                  className="text-[min(5vw,1.26rem)]"
                >
                  {" "}
                  Ok
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={handleNotOkButton}
                  className="text-[min(5vw,1.26rem)]"
                  size={"lg"}
                >
                  Not ok
                </Button>
              </div>
            ) : (
              <Button
                className={"text-[min(5vw,1.26rem)]"}
                onClick={() => setShowAnswer((prevState) => !prevState)}
              >
                Show answer
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLearn;
