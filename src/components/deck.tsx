import React from "react";
import DeckModel from "../model/DeckModel";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { editDeck } from "../state/DecksSlice";
import { removeDeckAndSync } from "../state/thunks";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { deckSchema } from "../state/deckValidation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  deck: DeckModel;
}

const Deck: React.FC<Props> = ({ deck }: Props) => {
  // inizializzo dispatch e stato editable
  const dispatch = useDispatch<AppDispatch>();
  const [editable, setEditable] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      deckName: deck.name,
    },
  });

  // gestione reindirizzazione
  // utilizzo stopropagation per evitare che il click venga propagato al parent
  // cioè che tutto porti al decklearn
  const navigate = useNavigate();
  const handleRedirectionToDeckCards = () => {
    navigate(`/deck/${deck.id}/cards`);
  };
  const handleRedirectionToDeckLearn = () => {
    navigate(`/deck/${deck.id}/learn`);
  };

  // inizializzazione contextmenu
  const { show } = useContextMenu({
    id: deck.id.toString(),
  });

  // gestione submit del form
  function onSubmit(values: z.infer<typeof deckSchema>) {
    dispatch(editDeck({ id: deck.id, text: values.deckName }));
    setEditable(false);
  }

  const { errors } = form.formState;

  return (
    <>
      <Menu id={deck.id.toString()} animation="fade" theme="dark">
        <Item onClick={handleRedirectionToDeckCards}>See cards</Item>
        <Item onClick={() => setEditable((prevState) => !prevState)}>
          Edit deck name
        </Item>
      </Menu>

      <div
        className="bg-secondary p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer w-full"
        onContextMenu={(e) => show({ event: e })}
        onClick={handleRedirectionToDeckLearn}
      >
        <div className="flex flex-col w-full">
          {editable ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="deckName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deck Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type deck name" {...field} />
                        </FormControl>
                        {errors.deckName && (
                          <FormMessage className="text-red-500">
                            {errors.deckName.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Modify</Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="text-3xl font-bold mb-2 w-full">{deck.name}</div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="text-primary">{deck.newCards}</div>
          <div className="text-destructive">{deck.learningCards}</div>
          <div className="text-chart-2">{deck.completedCards}</div>
          <MdDelete
            className="text-2xl text-primary"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeDeckAndSync(deck.id));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Deck;
