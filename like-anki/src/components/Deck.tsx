import React from 'react';
import InputFieldAdd from './InputFieldAction';
import DeckModel from '../model/DeckModel';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface Props {
  deck: DeckModel;
  dispatch: React.Dispatch<any>;
}

const Deck: React.FC<Props> = ({ deck, dispatch }: Props) => {
  // gestione dell'edit con due stati:
  // uno stato per tenere conto se il deck è in modalità edit
  // uno stato per tenere traccia del testo inserito
  const [editable, setEditable] = React.useState<boolean>(false);
  const [newText, setNewText] = React.useState<string>(deck.name);
  const handleEditable = () => {
    if (editable) setEditable(false);
    else setEditable(true);
  }

  // funzione per la modifica del deck
  const handleEditDeck = () =>{
    dispatch({ type: 'EDIT-DECK', payload: { id: deck.id, text: newText } });
    handleEditable();
  }

  return (
    <div className='card w-100 mb-3'>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <div className='w-100' style={{ maxWidth: '68%' }}> 
        {
          editable ?
          <InputFieldAdd name={newText} setName={setNewText} handleAction={handleEditDeck} actionName='Modify'/>
          : <div className='h4 m-0 text-wrap'>{deck.name}</div>
        }
        </div>
        <div className='d-flex gap-1'>
          <div className='h4 m-0 me-3'>{deck.newCards}</div>
          <div className='h4 m-0 me-3'>{deck.learningCards}</div>
          <div className='h4 m-0 me-3'>{deck.completedCards}</div>
          <MdDelete className='text-danger' style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={() => dispatch({ type: 'REMOVE-DECK', payload: deck.id })} />
          <CiEdit className='text-success' style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={handleEditable} />
        </div>
      </div>
    </div>
  );
}

export default Deck;