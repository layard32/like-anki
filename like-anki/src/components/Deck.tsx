import React from 'react';
import InputFieldAdd from './ui/InputFieldAction';
import DeckModel from '../model/DeckModel';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
  const handleEditDeck = () => {
    dispatch({ type: 'EDIT-DECK', payload: { id: deck.id, text: newText } });
    handleEditable();
  }

  // funzione per reindirizzare alla vista delle cards di un deck
  const navigate = useNavigate();
  const handleRedirectionToDeck = () => {
    navigate(`/deck/${deck.id}`);
  }

  return (
    <div className='card w-100 mb-3'>
      <div className='card-body d-flex align-items-center gap-4'>
        <div className='w-100' style={{ maxWidth: '68%' }}> 
        {
          editable ?
          <div className='w-75'> 
            <InputFieldAdd name={newText} setName={setNewText} handleAction={handleEditDeck} actionName='Modify'/>
          </div>
          : <div className='h4 m-0 text-wrap'>{deck.name}</div>
        }
        </div>
        <div className='d-flex flex-wrap' style={{ gap: '14px' }}>
          <div className='h4 m-0 text-primary'>{deck.newCards}</div>
          <div className='h4 m-0 text-danger'>{deck.learningCards}</div>
          <div className='h4 m-0 text-success'>{deck.completedCards}</div>
          <MdDelete className='text-danger' style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={() => dispatch({ type: 'REMOVE-DECK', payload: deck.id })} />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size='sm'>
              <CiEdit style={{ cursor: 'pointer', fontSize: '1.4rem' }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEditable}>Edit deck name</Dropdown.Item>
              <Dropdown.Item onClick={handleRedirectionToDeck}>See cards</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Deck;