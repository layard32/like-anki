// filepath: /home/davide/github/like-anki/src/components/createDeckDialog.tsx
import { z } from "zod";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addDeck } from "../state/DecksSlice";
import { AppDispatch } from "@/state/store";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DialogClose } from "./ui/dialog";
import { deckSchema } from "../state/deckValidation";

interface Props {}

const createDeckDialog: React.FC<Props> = ({}: Props) => {
  // importo lo schema di validazione usando zod
  const form = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      deckName: "",
    },
  });

  // utilizzo href per chiudere il dialog nel momento in cui il submit è avvenuto con successo
  const dispatch = useDispatch<AppDispatch>();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  function onSubmit(values: z.infer<typeof deckSchema>) {
    dispatch(addDeck(values.deckName));
    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  }

  // per mostrare gli errori
  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-7">
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
        <Button type="submit" className="my-0">
          {" "}
          Create{" "}
        </Button>
        <DialogClose asChild>
          <button ref={dialogCloseRef} style={{ display: "none" }} />
        </DialogClose>
      </form>
    </Form>
  );
};

export default createDeckDialog;
