import React from 'react'
import { useParams } from 'react-router-dom';
import ButtonAction from './ui/ButtonAction';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadData } from '../localforageUtils';
import DeckModel from '../model/DeckModel';
import CardModel from '../model/CardModel';
import Cards from './CardList';
import Card from './Card';

const DeckShow: React.FC= () => {
    // utilizzo l'useParams hook per prendere il parametro della nested route
    const { deckId } = useParams<{ deckId: string }>();

    // gestione reindirizzazione alla homepage
    const navigate = useNavigate();
    const handleRedirectionToHomePage = () => {
        navigate('/');
    };

    // prendo l'insieme dei deck da localforage per applicare una semplice validazione sull'url
    // se l'url è valido, utilizzo uno stato per tenere traccia del deck attuale
    const [deck, setDeck] = useState<DeckModel>();
    useEffect(() => {
        const loadInitialData = async () => {
            const storedDecks: DeckModel[] = await loadData('decks') as DeckModel[];
            const correspondigDeck = storedDecks.find((deck: DeckModel) => deck.id === Number(deckId));
            if (!correspondigDeck) handleRedirectionToHomePage();
            else setDeck(correspondigDeck);
        };
        loadInitialData();
    }, [deckId]);    

    // click destro porta all'apertura della card nella parte destra
    const [showedCard, setShowedCard] = React.useState<CardModel>();
    const handleLeftClick = (card: CardModel) => {
        setShowedCard(card);
    };

    return (
        deck ? (
            <div className='d-flex gap-3'>
                <div className='ms-3 w-100' style={{ maxWidth: '20%', minWidth: '210px' }}>
                    <ButtonAction onClickAction={handleRedirectionToHomePage} text='Go back' />
                    <div className='d-flex align-items-center gap-3'>
                        <div className='h4 wrap text-break'>{deck.name}</div>
                        <div className='h4 text-primary'>{deck.newCards}</div>
                        <div className='h4 text-danger'>{deck.learningCards}</div>
                        <div className='h4 text-success'>{deck.completedCards}</div>
                    </div>
                    <div>
                        {deck.cards.map((card) => (
                            <Cards key={card.id} card={card} handleLeftClick={handleLeftClick}/>
                        ))}
                    </div>
                </div>
                <div className='vr' style={{ minHeight: '100vh', minWidth: '4px', backgroundColor: 'black', opacity:'0.6' }}> </div>
                { showedCard ? (
                    <Card card={showedCard}/>
                ) : null }
            </div>
        ) : null
    );
};

export default DeckShow;