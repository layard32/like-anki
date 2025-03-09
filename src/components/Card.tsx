import React from "react";
import CardModel from "../model/CardModel";
import "../style/CardStyle.css";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { AnimatePresence } from "motion/react";

interface Props {
  cardId: number;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ cardId, children }: Props) => {
  // prendo la carta dallo store
  const card = useSelector((state: RootState) =>
    state.cards.cards.find((card) => card.id === cardId)
  ) as CardModel;

  // gestione scomparsa carta
  const [showCard, setShowCard] = React.useState<boolean>(true);

  // gestione dell'animazione per evitare che una nuova animazione parta prima che una deve finire
  const [currentCardId, setCurrentCardId] = React.useState<number | null>(
    cardId
  );
  React.useEffect(() => {
    if (cardId !== currentCardId) {
      setShowCard(false);
    }
  }, [cardId, currentCardId]);

  const handleAnimationComplete = () => {
    setCurrentCardId(cardId);
    setShowCard(true);
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {showCard && card && children}
    </AnimatePresence>
  );
};

export default Card;
