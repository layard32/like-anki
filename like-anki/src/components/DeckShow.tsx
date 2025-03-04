import React from 'react'
import { useParams } from 'react-router-dom';
import ButtonAction from './ui/ButtonAction';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadData } from '../localforageUtils';
import DeckModel from '../model/DeckModel';

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

    return (
        <div>
            { deck 
            ? <> 
                <ButtonAction onClickAction={handleRedirectionToHomePage} text='Go back' />
                <div className='d-flex align-items-center gap-3'> 
                    <div className='h4'> {deck.name} </div>
                    <div className='h4 text-primary'> {deck.newCards} </div> 
                    <div className='h4 text-danger'> {deck.learningCards} </div> 
                    <div className='h4 text-success'> {deck.completedCards} </div> 
                    {/* lista delle cards */}
                </div>
                <div>
                    {deck.cards.map((card) => (
                        card.question 
                ))}
                </div>
            </> : null
            }
        </div>
    )
};

export default DeckShow;