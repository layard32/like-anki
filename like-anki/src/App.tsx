import React from 'react';
import DeckList from './components/DeckList';
import DeckReducer from './hooks/DeckReducer';
import CardReducer from './hooks/CardReducer';
import Modal from './components/Modal';
import InputFieldAction from './components/InputFieldAction';

const App: React.FC = () => {
  // logica per i modali
  const [showModalDeck, setShowModalDeck] = React.useState<boolean>(false);
  const [showModalCard, setShowModalCard] = React.useState<boolean>(false);
  const handleModalDeck = () => {
    if (!showModalDeck && !showModalCard) setShowModalDeck(true);
    else setShowModalDeck(false);
  };
  const handleModalCard = () => {
    if (!showModalCard && !showModalDeck) setShowModalCard(true);
    else setShowModalCard(false);
  };

  // gestione con stato e handler per il modal che aggiunge un deck
  const [deckName, setDeckName] = React.useState<string>('');
  const handleAddDeck = () => {
    if (deckName !== '') {
        dispatchDecks({ type: 'ADD-DECK', payload: deckName });
        handleModalDeck();
    }
  };  

  // stati per la gestione dei deck
  const [decks, dispatchDecks] = React.useReducer(DeckReducer, []);
  // stati per la gestione delle cards
  const [cards, dispatchCards] = React.useReducer(CardReducer, []);

  return (
    <>
    <h1 className='text-center mt-3'> Like Anki </h1>

    {showModalDeck 
    ? <Modal handleModal = {handleModalDeck} 
             dispatch = {dispatchDecks} 
             modalName='Add New Deck' 
             sonComponent={<InputFieldAction name={deckName} setName={setDeckName} handleAction={handleAddDeck} actionName='Add deck'/>}/> 
    : null}

    {showModalCard
    ? <Modal handleModal = {handleModalCard} 
             dispatch = {dispatchDecks}  // TODO FARE DISPATCH
             modalName='Add a card to a deck' 
             // TODO FARE SON COMPONENT
             sonComponent={<InputFieldAction name={deckName} setName={setDeckName} handleAction={handleAddDeck} actionName='Add deck'/>}/> 
    : null}

    <div className='d-flex justify-content-center mt-5 gap-1'>
      <button className='btn btn-primary' onClick={handleModalDeck}> Create new deck </button>
      <button className='btn btn-secondary' onClick={handleModalCard}> Add card to a deck </button>
    </div>

    <DeckList decks = {decks} dispatch = {dispatchDecks} />      
    </>
  );
};

export default App;