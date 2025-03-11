import React from "react";
import DeckList from "./components/deckList";
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
import CreateCardDialog from "./components/createCardDialog";

const Home: React.FC = () => {
  return (
    <div>
      <div className="fixed top-11 left-3">
        <ModeToggle />
      </div>
      <h1 className="text-center text-5xl font-bold text-primary mt-9 md:mr-13">
        Like Anki
      </h1>{" "}
      <h4 className="text-center text-lg text-primary mt-5 mx-auto w-[min(600px,90vw)]">
        {" "}
        Left click on a deck to repeat its cards. Right click or use the edit
        icon to change the cards, or edit the deck name.
      </h4>
      <div className="flex justify-center mt-12 gap-4 flex-wrap">
        {" "}
        <Dialog>
          <DialogTrigger>
            <Button
              size={"lg"}
              variant={"default"}
              className="text-[min(5vw,1.26rem)]"
            >
              {" "}
              Create a new deck{" "}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> Create a new deck</DialogTitle>
            </DialogHeader>
            <CreateDeckDialog />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button
              size={"lg"}
              variant={"secondary"}
              className="text-[min(5vw,1.26rem)]"
            >
              {" "}
              Add a new card to a deck{" "}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new card</DialogTitle>
            </DialogHeader>
            <CreateCardDialog />
          </DialogContent>
        </Dialog>
      </div>
      <DeckList />
    </div>
  );
};

export default Home;
