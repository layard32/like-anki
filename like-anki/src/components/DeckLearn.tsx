import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ButtonAction from './ui/ButtonAction';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import DeckModel from '../model/DeckModel';
import { useEffect } from 'react';
import CardModel from '../model/CardModel';

const DeckLearn = () => {
    // utilizzo l'useParams hook per prendere il parametro della nested route
    const { deckId } = useParams<{ deckId: string }>();

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

    // se non ci sono cards, reindirizzo alla homepage
    useEffect(() => {
        if (!deck || cards.length === 0) {
            handleRedirectionToHomePage();
        }
    }, [deck, cards]);

    return (
        <div>
            <ButtonAction onClickAction={handleRedirectionToHomePage} text='Go back' />

            { 
            cards.map((card) => (
                <div key={card.id} className='card-container'>
                    <div className='card-content'>
                        <div className='card-body'>
                            <div className='card-question'>
                                {card.question}
                            </div>
                            <div className='card-answer'>
                                {card.answer}
                            </div>
                        </div>
                    </div>
                </div>
            )) 
            }

            <div className='d-flex align-items-center justify-content-center' >
                <div className='mb-3'>
                    <button className='btn btn-primary me-1'> Ok </button>
                    <button className='btn btn-secondary'> Not ok </button>
                </div>
            </div>
        </div>
    );
};

export default DeckLearn;