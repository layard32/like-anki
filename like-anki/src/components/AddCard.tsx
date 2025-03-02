import React from 'react'
import InputFieldAction from './InputFieldAction'

interface Props {
    inputName: string;
    inputSetName: React.Dispatch<React.SetStateAction<string>>;
}

const AddCard: React.FC<Props> = ({inputName, inputSetName}: Props) => {
    // logica aggiunta card ad un deck
    const [cardName, setCardName] = React.useState<string>('');
    // const handleAddCard = () => {
    //     if (deckName !== '') {
    //         dispatchCards({ type: 'ADD-CARD', payload: { id: Math.random(), question: deckName, answer: 'answer', status: 'new', deckId: 1 } });
    //         handleModalCard();
    //     }
    // };

  return (
    <div>
      {/* <InputFieldAction name={inputName} setName={inputSetName} handleAction={handleAddCard} actionName='Add a card to your deck'/> */}
    </div>
  )
}

export default AddCard
