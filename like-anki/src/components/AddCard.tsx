import React from 'react'
import TextArea from './TextArea';
import SelectFromOptions from './SelectFromOptions';
import DeckModel from '../model/DeckModel';

interface Props {
  cardQuestion: string;
  cardAnswer: string;
  setCardQuestion: React.Dispatch<React.SetStateAction<string>>;
  setCardAnswer: React.Dispatch<React.SetStateAction<string>>;
  decks: string[];
}

const AddCard: React.FC<Props> = ({cardQuestion, cardAnswer, setCardAnswer, setCardQuestion, decks}: Props) => {

  return (
    <div>
      <h5 className='ms-2 mt-3'> Deck </h5>
      { <SelectFromOptions options = {decks} />}
      <hr />
      <h5 className='ms-2'> Question </h5>
      { <TextArea body={cardQuestion} setBody={setCardQuestion} placeholder='Type the question' /> }
      <hr />
      <h5 className='ms-2'> Answer </h5>
      { <TextArea body={cardAnswer} setBody={setCardAnswer} placeholder='Type your answer' /> }
    </div>
  )
};

export default AddCard;
