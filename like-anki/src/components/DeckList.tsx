import React from 'react';
import DeckModel from '../model/DeckModel';
import Deck from './Deck';

interface Props {
    decks: DeckModel[];
    dispatch: React.Dispatch<any>;
}

const DeckList: React.FC<Props> = ({ decks, dispatch }: Props) => {
    return (
        <div className='mt-5 d-flex flex-column align-items-center no-wrap mx-auto' style={{ maxWidth: '35%', minWidth: '400px' }}>
            <div className='w-100 mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='h4'>Name </span>
                    <div className='d-flex gap-3'> 
                        <span className='h4'>New</span>
                        <span className='h4'>Learning</span>
                        <span className='h4'>Completed</span>
                    </div>
                </div>
            </div>
            {decks.map((deck) => (
                    <Deck key={deck.id} deck={deck} dispatch={dispatch} />
            ))} 
        </div>
    );
}

export default DeckList;