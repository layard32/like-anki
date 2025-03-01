import React from 'react';
import DeckList from './components/DeckList';
import DeckReducer from './hooks/DeckReducer';
import Modal from './components/Modal';

const App: React.FC = () => {
  // stati per la gestione dei deck
  const [decks, dispatchDecks] = React.useReducer(DeckReducer, []);

  // logica per il modale
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const handleModal = () => {
    if (!showModal) setShowModal(true);
    else setShowModal(false);
  }

  return (
    <>
    <h1 className='text-center mt-3'> Like Anki </h1>
    {showModal ? <Modal handleModal = {handleModal} dispatch = {dispatchDecks} /> : null}

    <div className='d-flex justify-content-center mt-5 gap-1'>
      <button className='btn btn-primary' onClick={handleModal}> Create new deck </button>
      <button className='btn btn-secondary'> Add card to a deck </button>
    </div>

    <DeckList decks = {decks} dispatch = {dispatchDecks} />      
    </>
  );
}

export default App;