import React from "react";
import DeckList from "./components/DeckList";
import AddCard from "./components/addCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./state/store";
import { addDeck } from "./state/DecksSlice";
import { addCardAndSync } from "./state/thunks";
import ButtonAction from "./components/ui/buttonAction";
import { ModeToggle } from "./components/mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import CreateDeckDialog from "./components/createDeckDialog";

const Home: React.FC = () => {
  // logica per entrambi i modali (sia aggiunta deck che card ad un deck)
  // const [showModalDeck, setShowModalDeck] = React.useState<boolean>(false);
  // const [showModalCard, setShowModalCard] = React.useState<boolean>(false);
  // const handleModalDeck = () => {
  //   if (!showModalDeck && !showModalCard) setShowModalDeck(true);
  //   else setShowModalDeck(false);
  // };
  // const handleModalCard = () => {
  //   if (!showModalCard && !showModalDeck) setShowModalCard(true);
  //   else setShowModalCard(false);
  // };

  // prendo decks e dispatch dallo store
  // const decks = useSelector((state: RootState) => state.decks.decks);
  // const dispatch = useDispatch<AppDispatch>();

  // // stato per il modale che aggiunge i deck
  // const [deckName, setDeckName] = React.useState<string>("");

  // // stati per il modale che aggiunge le cards
  // const [cardQuestion, setCardQuestion] = React.useState<string>("");
  // const [cardAnswer, setCardAnswer] = React.useState<string>("");
  // const [deckForCards, setDeckForCards] = React.useState<number>(0);

  return (
    <div>
      <div className="fixed top-10 left-3">
        <ModeToggle />
      </div>
      <h1 className="text-center text-5xl font-bold text-primary mt-9">
        Like Anki
      </h1>{" "}
      <div className="flex justify-center mt-10 gap-4">
        {" "}
        <Dialog>
          <DialogTrigger>
            <Button size={"lg"}> Create a new deck </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new deck</DialogTitle>
            </DialogHeader>
            <CreateDeckDialog />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button size={"lg"} variant={"secondary"}>
              {" "}
              Add a new card to a deck{" "}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new card</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* {showModalDeck ? (
        <Modal
          handleModal={handleModalDeck}
          modalName="Add New Deck"
          sonComponent={
            <InputFieldAction
              name={deckName}
              setName={setDeckName}
              handleAction={() => {
                dispatch(addDeck(deckName));
                handleModalDeck();
              }}
              actionName="Add deck"
            />
          }
        />
      ) : null}

      {showModalCard ? (
        <Modal
          handleModal={handleModalCard}
          modalName="Add a card to a deck"
          sonComponent={
            <AddCard
              cardQuestion={cardQuestion}
              setCardQuestion={setCardQuestion}
              cardAnswer={cardAnswer}
              setCardAnswer={setCardAnswer}
              decks={decks}
              setDeckForCards={setDeckForCards}
              deckForCards={deckForCards}
              createCard={() => {
                dispatch(
                  addCardAndSync({
                    question: cardQuestion,
                    answer: cardAnswer,
                    deckId: deckForCards,
                  })
                );
                handleModalCard();
              }}
            />
          }
        />
      ) : null}

      <div className="flex justify-center mt-5 gap-4">
        <ButtonAction
          onClickAction={handleModalCard}
          text={"Add card to a deck"}
        />
      </div> */}
      <DeckList />
    </div>
  );
};

export default Home;
