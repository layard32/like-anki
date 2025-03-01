import React from 'react';
import DeckModel from '../model/DeckModel';
import { MdDelete } from "react-icons/md";

interface Props {
  deck: DeckModel;
  dispatch: React.Dispatch<any>;
}

const Deck: React.FC<Props> = ({ deck, dispatch }: Props) => {
  return (
    <div className='card w-100 mb-3'>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <span className='h4'>{deck.name}</span>
        <div className='d-flex align-items-center ms-auto'>
          <span className='h4 me-3'>{deck.numberOfCards}</span>
          <MdDelete className='text-danger' style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={() => dispatch({ type: 'REMOVE-DECK', payload: deck.id })} />
        </div>
      </div>
    </div>
  );
}

export default Deck;