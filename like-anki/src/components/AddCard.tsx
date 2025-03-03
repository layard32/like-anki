import React from 'react'
import TextArea from './ui/TextArea';
import SelectFromOptions from './ui/SelectFromOptions';
import Button from './ui/Button';

interface Props {
  cardQuestion: string;
  cardAnswer: string;
  setCardQuestion: React.Dispatch<React.SetStateAction<string>>;
  setCardAnswer: React.Dispatch<React.SetStateAction<string>>;
  decks: string[];
}

const AddCard: React.FC<Props> = ({cardQuestion, cardAnswer, setCardAnswer, setCardQuestion, decks}: Props) => {

  return (
    <div className='w-75 text-center mx-auto'>
      <h5 className='ms-2 mt-3'> Deck </h5>
      { <SelectFromOptions options = {decks} />}
      <h5 className='ms-2 mt-3'> Question </h5>
      { <TextArea body={cardQuestion} setBody={setCardQuestion} placeholder='Type the question' /> }
      <h5 className='ms-2 mt-3'> Answer </h5>
      { <TextArea body={cardAnswer} setBody={setCardAnswer} placeholder='Type your answer' /> }
      { <Button text='Add the card' onClickAction={() => {}} /> }
    </div>
  )
};

export default AddCard;
