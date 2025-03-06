import React from 'react';
import DeckList from './components/DeckList';
import DeckReducer from './hooks/DeckReducer';
import CardReducer from './hooks/CardReducer';
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

  // utilizzo un id incrementale e non randomico per evitare di avere due figli con stesso id
  const [deckIdNumber, setDeckIdNumber] = React.useState<number>(1);
  const [cardIdNumber, setCardIdNumber] = React.useState<number>(1);

  useEffect(() => {
    const loadInitialData = async () => {
        const storedDecks: DeckModel[] = await loadData('decks') as DeckModel[];
        const storedCards: CardModel[] = await loadData('cards') as CardModel[];
        const storedDeckIdNumber: number = await loadData('deckIdNumber') as number;
        const storedCardIdNumber: number = await loadData('cardIdNumber') as number;
        if (storedDecks) dispatchDecks({ type: 'SET-DECKS', payload: storedDecks });
        if (storedCards) dispatchCards({ type: 'SET-CARDS', payload: storedCards });
        if (storedDeckIdNumber) setDeckIdNumber(storedDeckIdNumber);
        if (storedCardIdNumber) setCardIdNumber(storedCardIdNumber);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    saveData('decks', decks);
    saveData('deckIdNumber', deckIdNumber);
  }, [decks, deckIdNumber]);

  useEffect(() => {
    saveData('cards', cards);
    saveData('cardIdNumber', cardIdNumber);
  }, [cards, cardIdNumber]);

  // gestione con stato e handler per il modal che aggiunge un deck
  const [deckName, setDeckName] = React.useState<string>('');
  const handleAddDeck = () => {
    if (deckName !== '') {
        dispatchDecks({ type: 'ADD-DECK', payload: { name: deckName, id: deckIdNumber } });
        setDeckIdNumber(deckIdNumber + 1);
        handleModalDeck();
    }
  };

  // gestione con stati e handlers per il modal che aggiunge le cards
  const [cardQuestion, setCardQuestion] = React.useState<string>('');
  const [cardAnswer, setCardAnswer] = React.useState<string>('');
  const [deckForCards, setDeckForCards] = React.useState<number>(0);
  // creazione di una nuova card ed aggiunta al relativo deck
  // ATTENZIONE: sposto parte della logica dal reducer a qui, perché la card mi serve per un altro dispatch
  // cosa non particolarmente corretta, ma in questo caso mi sembra la soluzione più semplice
  const handleAddCard = () => {
    if (cardQuestion !== '' && cardAnswer !== '' && deckForCards > 0) {
      // logica della creazione della card rubata dal reducer
      const newCard: CardModel = {
        id: cardIdNumber,
        question: cardQuestion,
        answer: cardAnswer,
        status: 'new',
        deckId: deckForCards
      };
      // creazione nuova carta ed incremento id
      dispatchCards({ type: 'ADD-CARD', payload: newCard });
      setCardIdNumber(cardIdNumber + 1);
      // aggiunta card al deck
      dispatchDecks({ type: 'ADD-CARD-TO-DECK', payload: { id: deckForCards, card: newCard } });
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

    <DeckList decks = {decks} dispatch = {dispatchDecks} />      
    </>
  );
};

export default Home;