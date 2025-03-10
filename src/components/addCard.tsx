import React from "react";
import TextArea from "./ui/TextArea";
import SelectFromOptions from "./ui/SelectFromOptions";
import ButtonAction from "./ui/buttonAction";
import DeckModel from "../model/DeckModel";

interface Props {
  cardQuestion: string;
  cardAnswer: string;
  decks: DeckModel[];
  deckForCards: number;
  setDeckForCards: React.Dispatch<React.SetStateAction<number>>;
  setCardQuestion: React.Dispatch<React.SetStateAction<string>>;
  setCardAnswer: React.Dispatch<React.SetStateAction<string>>;
  createCard: () => void;
}

const AddCard: React.FC<Props> = ({
  createCard,
  deckForCards,
  cardQuestion,
  cardAnswer,
  setCardAnswer,
  setCardQuestion,
  decks,
  setDeckForCards,
}: Props) => {
  // GESTIONE LOGICA SELECT:
  // 1. funzione che associa la stringa restituita dal select al deck id
  const handleSetDeckForCards = (deckName: string) => {
    const deckId = decks.find((deck) => deck.name === deckName)?.id;
    if (deckId) setDeckForCards(deckId);
  };
  // 2. un array con i nomi dei decks per il select
  const deckNames = decks.map((deck) => deck.name);
  // 3. un useeffect per resettare il deck selezionato quando la componente viene montata
  React.useEffect(() => {
    setDeckForCards(-1);
  }, []);

  return (
    <div className="w-75 text-center mx-auto">
      <h5 className="ms-2 mt-3"> Deck </h5>
      {
        <SelectFromOptions
          options={deckNames}
          setOptions={handleSetDeckForCards}
        />
      }
      <h5 className="ms-2 mt-3"> Question </h5>
      {
        <TextArea
          body={cardQuestion}
          setBody={setCardQuestion}
          placeholder="Type the question"
        />
      }
      <h5 className="ms-2 mt-3"> Answer </h5>
      {
        <TextArea
          body={cardAnswer}
          setBody={setCardAnswer}
          placeholder="Type your answer"
        />
      }
      {<ButtonAction text="Add the card" onClickAction={createCard} />}
    </div>
  );
};

export default AddCard;
