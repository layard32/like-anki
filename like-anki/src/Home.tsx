import React from 'react';
import DeckList from './components/DeckList';
import Modal from './components/ui/Modal';
import InputFieldAction from './components/ui/InputFieldAction';
import AddCard from './components/AddCard';
import CardModel from './model/CardModel';
import DeckModel from './model/DeckModel';
import { saveData, loadData } from './localforageUtils';
import { useEffect } from 'react';
import { useDeckDispatch, useDeckState } from './context/DeckContext';
import { useCardDispatch, useCardState } from './context/CardContext';

const Home: React.FC = () => {
  // logica per entrambi i modali (sia aggiunta deck che card ad un deck)
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

  // stati per la gestione dei deck e cards con salvataggio tramite libreria localforage
  // li prendo dal contesto
  const decks = useDeckState();
  const dispatchDecks = useDeckDispatch();
  const cards = useCardState();
  const dispatchCards = useCardDispatch();

  // gestione con stato e handler per il modal che aggiunge un deck
  const [deckName, setDeckName] = React.useState<string>('');
  const handleAddDeck = () => {
    if (deckName !== '') {
        dispatchDecks({ type: 'ADD-DECK', payload: deckName });
        handleModalDeck();
    }
  };

  // gestione con stati e handlers per il modal che aggiunge le cards
  const [cardQuestion, setCardQuestion] = React.useState<string>('');
  const [cardAnswer, setCardAnswer] = React.useState<string>('');
  const [deckForCards, setDeckForCards] = React.useState<number>(0);
  const handleAddCard = () => {
    if (cardQuestion !== '' && cardAnswer !== '' && deckForCards > 0) {
      dispatchCards({ type: 'ADD-CARD', payload: { question: cardQuestion, 
                    answer: cardAnswer,
                    deckId: deckForCards  } });
      // oltre ad aggiungere la card, aggiorno anche il deck 
      dispatchDecks({ type: 'SYNC-CARDS', payload: cards });
      handleModalCard();
    }
  };


  return (
    <>
    <h1 className='text-center mt-3'> Like Anki </h1>

    {showModalDeck 
    ? <Modal handleModal = {handleModalDeck} 
             dispatch = {dispatchDecks} 
             modalName='Add New Deck' 
             sonComponent={<InputFieldAction name={deckName} 
                          setName={setDeckName} 
                          handleAction={handleAddDeck} 
                          actionName='Add deck'/> }/> 
    : null}

    {showModalCard
    ? <Modal handleModal = {handleModalCard} 
             dispatch = {dispatchCards}
             modalName='Add a card to a deck'
             sonComponent={<AddCard cardQuestion={cardQuestion}
                          setCardQuestion={setCardQuestion}
                          cardAnswer={cardAnswer}
                          setCardAnswer={setCardAnswer} 
                          decks={decks}
                          setDeckForCards={setDeckForCards}
                          deckForCards={deckForCards}
                          createCard={handleAddCard}
                          />}/> 
    : null}

    <div className='d-flex justify-content-center mt-5 gap-1'>
      <button className='btn btn-primary' onClick={handleModalDeck}> Create new deck </button>
      <button className='btn btn-secondary' onClick={handleModalCard}> Add card to a deck </button>
    </div>

    <DeckList />      
    </>
  );
};

export default Home;