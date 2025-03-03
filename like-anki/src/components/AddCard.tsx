import React from 'react'
import TextArea from './TextArea';

interface Props {
  cardQuestion: string;
  cardAnswer: string;
  setCardQuestion: React.Dispatch<React.SetStateAction<string>>;
  setCardAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const AddCard: React.FC<Props> = ({cardQuestion, cardAnswer, setCardAnswer, setCardQuestion}: Props) => {

  return (
    <div>
      { <TextArea body={cardQuestion} setBody={setCardQuestion} placeholder='Type the question' /> }
      <hr />
      { <TextArea body={cardAnswer} setBody={setCardAnswer} placeholder='Type your answer' /> }
    </div>
  )
};

export default AddCard;
