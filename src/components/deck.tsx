import React from "react";
import DeckModel from "../model/DeckModel";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
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
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  deck: DeckModel;
}

const Deck: React.FC<Props> = ({ deck }: Props) => {
  // inizializzo dispatch e stato editable
  const dispatch = useDispatch<AppDispatch>();
  const [editable, setEditable] = React.useState<boolean>(false);
  const form = useForm<z.infer<ReturnType<typeof deckSchema>>>({
    // passiamo il deck.id per evitare che la funzione edit non consenta di tenere lo stesso nome
    resolver: zodResolver(deckSchema(deck.id)),
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
  function onSubmit(values: z.infer<ReturnType<typeof deckSchema>>) {
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
        className="bg-secondary p-4 rounded-lg shadow-lg flex flex-row items-center
        h-[min(24vw,5.4rem)]
        justify-between gap-4 cursor-pointer w-full 
        dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(255,255,255,0.1)]"
        onContextMenu={(e) => show({ event: e })}
        onClick={handleRedirectionToDeckLearn}
      >
        <div className="w-99">
          {editable ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-center gap-2"
                >
                  <FormField
                    control={form.control}
                    name="deckName"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            className="bg-primary h-[2.6rem] md:text-lg sm:text-base lg:text-xl"
                            placeholder="Type deck name"
                            {...field}
                          />
                        </FormControl>
                        {errors.deckName && (
                          <FormMessage className="text-red-500">
                            {errors.deckName.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <Button className="h-[2.6rem]" type="submit">
                    Modify
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="text-[min(5vw,1.6rem)] font-bold w-full">
              {deck.name}
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-center 
        gap-3 flex-wrap
        sm:flex-nowrap sm:gap-5"
        >
          <div className="text-[min(5vw,1.5rem)] font-bold text-primary">
            {deck.newCards}
          </div>
          <div className="text-[min(5vw,1.5rem)] font-bold text-destructive">
            {deck.learningCards}
          </div>
          <div className="text-[min(5vw,1.5rem)] font-bold text-chart-2">
            {deck.completedCards}
          </div>
          <div
            className="flex gap-2
          flex-row
          sm:flex-col sm:mx-2 sm:ml-15"
            onClick={(e) => e.stopPropagation()}
          >
            <MdDelete
              className="text-[min(6vw,1.7rem)] text-primary dark:text-foreground"
              onClick={() => {
                dispatch(removeDeckAndSync(deck.id));
              }}
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CiEdit
                  onClick={() => {
                    dispatch(removeDeckAndSync(deck.id));
                  }}
                  className="text-[min(6vw,1.7rem)] text-primary cursor-pointer dark:text-foreground"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-base"
                  onClick={handleRedirectionToDeckCards}
                >
                  See cards
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-base"
                  onClick={() => setEditable((prevState) => !prevState)}
                >
                  Edit deck name
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deck;
