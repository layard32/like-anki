import React from "react";
import CardModel from "../model/CardModel";

interface Props {
  card: CardModel;
  handleLeftClick: (card: CardModel) => void;
  selectedCard: CardModel | undefined;
}

const CardList: React.FC<Props> = ({
  card,
  handleLeftClick,
  selectedCard,
}: Props) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer w-[min(32vw,500px)]
        ${
          card.status === "new"
            ? "bg-blue-100"
            : card.status === "learning"
            ? "bg-red-100"
            : card.status === "completed"
            ? "bg-green-100"
            : "bg-gray-100"
        } ${
        card === selectedCard ? "border-primary" : "border-gray-300"
      } border`}
      onClick={() => handleLeftClick(card)}
    >
      <div className="text-[min(5vw,1.1rem)] break-words text-primary">
        {" "}
        {card.question}{" "}
      </div>
    </div>
  );
};

export default CardList;
