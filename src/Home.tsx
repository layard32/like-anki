import React from "react";
import DeckList from "./components/DeckList";
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
            <CreateCardDialog />
          </DialogContent>
        </Dialog>
      </div>
      <DeckList />
    </div>
  );
};

export default Home;
