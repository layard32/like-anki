import React from "react";
import Deck from "./deck";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { motion, AnimatePresence } from "motion/react";

interface Props {}

const deckList: React.FC<Props> = () => {
  // prendo i decks dallo store
  const decks = useSelector((state: RootState) => state.decks.decks);

  return (
    <div
      className="mt-5 flex flex-col items-center mx-auto"
      style={{ maxWidth: "35%", minWidth: "390px" }}
    >
      <div className="w-full my-8">
        <div className="flex justify-between items-center">
          <span className="text-2xl">Name </span>
          <div className="flex gap-3">
            <span className="text-2xl text-bold text-primary">New</span>
            <span className="text-2xl text-bold text-destructive">
              Learning
            </span>
            <span className="text-2xl text-bold text-chart-2">Completed</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {decks.map((deck) => (
          <motion.div
            layout
            key={deck.id}
            style={{
              width: "100%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.25 },
            }}
          >
            <Deck key={deck.id} deck={deck} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default deckList;
