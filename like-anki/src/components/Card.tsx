import React from 'react'
import CardModel from '../model/CardModel';
import '../style/CardStyle.css';
import { MdDelete } from "react-icons/md";
import { removeCard } from '../state/CardsSlice';
import { useDispatch } from 'react-redux';

interface Props {
    card: CardModel;
}

const Card: React.FC<Props> = ({ card }: Props) => {
    // utilizzo il dispatch per rimuovere ed editare la carta
    const dispatch = useDispatch();
    // definisco uno stato per mostrare o meno la carta (se questa viene eliminata)
    const [ showCard, setShowCard ] = React.useState<boolean>(true);

    return (
        showCard ?
                <div className='card-container'>
                <div className='card-content'>
                    <div className='card-body'>
                        <MdDelete className='text-danger' 
                                style={{ cursor: 'pointer', fontSize: '2rem' }} 
                                onClick={() => {
                                    dispatch(removeCard(card.id));
                                    setShowCard(false);}}/>
                        <div className='h3'> Status: {card.status} </div>
                        <hr />
                        <div className='h3'> Question </div>
                        <div className='h4'> {card.question} </div>
                        <hr />
                        <div className='h3'> Answer </div>
                        <div className='h4'> {card.answer} </div>
                    </div>
                </div>
            </div>
        : null
    )
};

export default Card;