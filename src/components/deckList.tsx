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
    <div className="flex flex-col mx-auto w-[min(85vw,800px)]">
      <div className="w-full my-12">
        <div className="flex justify-between items-center flex-wrap">
          <span className="text-[min(5vw,1.5rem)] font-bold mr-3">Name </span>
          <div className="flex gap-4">
            <span className="text-[min(5vw,1.5rem)] font-bold text-primary">
              New
            </span>
            <span className="text-[min(5vw,1.5rem)] font-bold text-destructive">
              Learning
            </span>
            <span className="text-[min(5vw,1.5rem)] font-bold text-chart-2">
              Completed
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6 w-[98%] mx-auto">
        <AnimatePresence>
          {decks.map((deck) => (
            <motion.div
              layout
              key={deck.id}
              className="w-full"
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
    </div>
  );
};

export default deckList;
