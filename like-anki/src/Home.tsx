import React from 'react';
import DeckList from './components/DeckList';
import Modal from './components/ui/Modal';
import InputFieldAction from './components/ui/InputFieldAction';
import AddCard from './components/AddCard';
import CardModel from './model/CardModel';
import DeckModel from './model/DeckModel';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './state/store';
import { AppDispatch } from './state/store';
import { addDeck } from './state/DecksSlice';
import { addCard } from './state/CardsSlice';

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

  // prendo decks, cards e dispatch dallo store
  const decks = useSelector((state: RootState) => state.decks);
  const cards = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch<AppDispatch>();

  // stato per il modale che aggiunge i deck
  const [deckName, setDeckName] = React.useState<string>('');

  // stati per il modale che aggiunge le cards
  const [cardQuestion, setCardQuestion] = React.useState<string>('');
  const [cardAnswer, setCardAnswer] = React.useState<string>('');
  const [deckForCards, setDeckForCards] = React.useState<number>(0);


  return (
    <>
    <h1 className='text-center mt-3'> Like Anki </h1>

    {showModalDeck 
    ? <Modal handleModal = {handleModalDeck} 
             modalName='Add New Deck' 
             sonComponent={<InputFieldAction name={deckName} 
                          setName={setDeckName} 
                          handleAction={() => {
                            dispatch(addDeck(deckName));
                            handleModalDeck(); }} 
                          actionName='Add deck'/> }/> 
    : null}

    {showModalCard
    ? <Modal handleModal = {handleModalCard} 
             modalName='Add a card to a deck'
             sonComponent={<AddCard cardQuestion={cardQuestion}
                          setCardQuestion={setCardQuestion}
                          cardAnswer={cardAnswer}
                          setCardAnswer={setCardAnswer} 
                          decks={decks}
                          setDeckForCards={setDeckForCards}
                          deckForCards={deckForCards}
                          createCard={() => {
                            dispatch(addCard({
                              question: cardQuestion,
                              answer: cardAnswer,
                              deckId: deckForCards
                            }));
                            handleModalCard();
                          }}
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