import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ButtonAction from './ui/ButtonAction';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import DeckModel from '../model/DeckModel';
import { useEffect } from 'react';
import CardModel from '../model/CardModel';
import { updateCardAndSync } from '../state/thunks'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';

const DeckLearn = () => {
    // utilizzo l'useParams hook per prendere il parametro della nested route 
    // e usedispatch per prendere la dispatch
    const { deckId } = useParams<{ deckId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    // gestione reindirizzazione alla homepage
    const navigate = useNavigate();
    const handleRedirectionToHomePage = () => {
        navigate('/');
    };

    // prendo l'insieme delle cards e dei deck
    // poi il deck attuale e le card relative al deck attuale
    const Alldecks = useSelector((state: RootState) => state.decks.decks);
    const Allcards = useSelector((state: RootState) => state.cards.cards);
    const deck = Alldecks.find((deck: DeckModel) => deck.id === Number(deckId));
    const cards = deck ? Allcards.filter((card) => card.deckId === deck.id) as CardModel[] : [];
    // divido le cards in learning e new
    const learningCards = cards.filter((card) => card.status === 'learning');
    const newCards = cards.filter((card) => card.status === 'new');

    // se non ci sono learning cards o new cards, reindirizzo alla homepage
    useEffect(() => {
        if (!deck || (learningCards.length === 0 && newCards.length === 0)) handleRedirectionToHomePage();
    }, [deck, cards]);

    // tengo traccia della card attuale e dell'index attuale
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [currentCard, setCurrentCard] = React.useState<CardModel>(cards[currentIndex]);

    // se ci sono new cards, le metto per prime; altrimenti metto le learning cards
    useEffect(() => {
        if (newCards.length > 0) {
            setCurrentCard(newCards[currentIndex]);
        } else {
            setCurrentCard(learningCards[currentIndex]);
        }
    }, [cards]);

    const handleOkButton = () => {
        // se clicco ok su una new card, questa diventa completed
        // se clicco ok su una learning card, questa diventa learning
        if (currentCard.status === 'new') {
            dispatch(updateCardAndSync({ id: currentCard.id, status: 'completed', deckId: Number(deckId) }));
        } else if (currentCard.status === 'learning') {
            dispatch(updateCardAndSync({ id: currentCard.id, status: 'learning', deckId: Number(deckId) }));
        }
    }

    return (
        <div>
            <ButtonAction onClickAction={handleRedirectionToHomePage} text='Go back' />

            { currentCard ? 

                <div className='card-container'>
                    <div className='card-content' style={{ backgroundColor: currentCard.status === 'new' ? 'rgba(0, 0, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)' }}>
                        <div className='card-body'>
                            <div className='card-question'>
                                {currentCard.question}
                            </div>
                            <div className='card-answer'>
                                {currentCard.answer}
                            </div>
                        </div>
                    </div>
                </div> 
                : null
            }

            <div className='d-flex align-items-center justify-content-center' >
                <div className='mb-3'>
                    <button className='btn btn-primary me-1' onClick={handleOkButton}> Ok </button>
                    <button className='btn btn-secondary'> Not ok </button>
                </div>
            </div>
        </div>
    );
};

export default DeckLearn;