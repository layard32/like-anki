import React from "react";
import CardModel from "../model/CardModel";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { removeCardAndSync } from "../state/thunks";
import { AppDispatch, RootState } from "../state/store";
import { editCard } from "../state/CardsSlice";
import ButtonAction from "./ui/buttonAction";
import { motion } from "motion/react";
import Card from "./card";
import { Input } from "./ui/input";

interface Props {
  cardId: number;
  deckId: number;
}

const CardEdit: React.FC<Props> = ({ cardId, deckId }: Props) => {
  // utilizzo il dispatch per rimuovere ed editare la carta e prendo la carta dallo store
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) =>
    state.cards.cards.find(
      (card) => card.id === cardId && card.deckId === deckId
    )
  ) as CardModel;

  // stati per la modifica di una carta
  const [editable, setEditable] = React.useState<boolean>(false);
  const [newQuestion, setNewQuestion] = React.useState<string>("question");
  const [newAnswer, setNewAnswer] = React.useState<string>("answer");
  const handleEditable = () => {
    if (editable) setEditable(false);
    else setEditable(true);
  };

  // gestione della scomparsa della carta (per riempire i campi)
  React.useEffect(() => {
    if (card) {
      setNewQuestion(card.question);
      setNewAnswer(card.answer);
    }
    // se la card cambia, setto editable a false
    setEditable(false);
  }, [card]);

  if (!card) {
    return null;
  }

  return (
    <Card cardId={cardId}>
      <motion.div
        className="lg:ml-25 ml-3 w-[min(550px,57vw)]"
        layout
        key={card.id}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          scale: { type: "spring", visualDuration: 0.1, bounce: 0.2 },
        }}
      >
        <div className="rounded-lg shadow-md dark:shadow-gray-700 p-4 bg-secondary">
          <div className="flex flex-row items-center justify-start gap-2">
            <MdDelete
              className="text-primary cursor-pointer text-2xl"
              onClick={() => {
                dispatch(
                  removeCardAndSync({ id: card.id, deckId: card.deckId })
                );
              }}
            />
            <CiEdit
              className="text-primary cursor-pointer text-2xl"
              onClick={handleEditable}
            />
          </div>

          <div className="text-lg font-semibold mt-2 ">
            Status: {card.status}
          </div>
          <hr className="bg-primary h-0.5 mt-1" />

          <div className="text-lg font-semibold mt-2.5">Question</div>
          {editable ? (
            <Input
              className="bg-primary-foreground text-base"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
          ) : (
            <div className="text-md break-words">{card.question}</div>
          )}
          <hr className="bg-primary h-0.5 mt-1" />

          <div className="text-lg font-semibold mt-2.5">Answer</div>
          {editable ? (
            <Input
              className="bg-primary-foreground text-base"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          ) : (
            <div className="text-md break-words">{card.answer}</div>
          )}

          {editable ? (
            <ButtonAction
              text="Save"
              onClickAction={() => {
                dispatch(
                  editCard({
                    id: card.id,
                    question: newQuestion,
                    answer: newAnswer,
                    deckId: card.deckId,
                  })
                );
                handleEditable();
              }}
              className="mt-4"
            />
          ) : null}
        </div>
      </motion.div>
    </Card>
  );
};

export default CardEdit;
