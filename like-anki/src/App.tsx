import React from 'react';
import DeckList from './components/DeckList';
import DeckModel from './model/DeckModel';
import DeckReducer from './hooks/DeckReducer';

const App: React.FC = () => {
  // stati per la gestione dei deck
  const [decks, dispatch] = React.useReducer(DeckReducer, []);

  return (
    <>
    <h1 className='text-center mt-3'> Like Anki </h1>

    <div className='d-flex justify-content-center mt-5 gap-1'>
      <button className='btn btn-primary'> Create new deck </button>
      <button className='btn btn-secondary'> Add card to a deck </button>
    </div>

    <div className='d-flex flex-column mt-5'> 
      <DeckList />      
    </div>
    </>
  );
}

export default App;