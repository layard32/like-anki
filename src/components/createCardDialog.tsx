import { z } from "zod";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DialogClose } from "./ui/dialog";
import { cardSchema } from "../state/cardValidation";
import { addCardAndSync } from "../state/thunks";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface Props {}

const createCardDialog: React.FC<Props> = ({}: Props) => {
  // importo lo schema di validazione usando zod
  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      deckId: 0,
      question: "",
      answer: "",
    },
  });

  // utilizzo href per chiudere il dialog nel momento in cui il submit è avvenuto con successo
  const dispatch = useDispatch<AppDispatch>();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  function onSubmit(values: z.infer<typeof cardSchema>) {
    dispatch(addCardAndSync(values));
    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  }

  // per mostrare gli errori
  const { errors } = form.formState;
  // prendo i decks per il select
  const decks = useSelector((state: RootState) => state.decks.decks);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-7">
        <FormField
          control={form.control}
          name="deckId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose the deck</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                  }}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {decks.map((deck) => (
                      <SelectItem key={deck.id} value={deck.id.toString()}>
                        {deck.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {errors.deckId && (
                <FormMessage className="text-red-500">
                  {errors.deckId.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card question</FormLabel>
              <FormControl>
                <Textarea placeholder="Type the question" {...field} />
              </FormControl>
              {errors.question && (
                <FormMessage className="text-red-500">
                  {errors.question.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card answer</FormLabel>
              <FormControl>
                <Textarea placeholder="Type deck name" {...field} />
              </FormControl>
              {errors.answer && (
                <FormMessage className="text-red-500">
                  {errors.answer.message}
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

export default createCardDialog;
