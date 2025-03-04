import React from 'react'
import CardModel from '../model/CardModel'

interface Props {
    card: CardModel;
    handleLeftClick: (card: CardModel) => void;
}

const Cards: React.FC<Props> = ({ card, handleLeftClick }: Props) => {
    return (
        <div className='card mt-3 mb-2' onClick={() => handleLeftClick(card)}
            style={{ borderRadius: '10px', 
            backgroundColor: card.status === 'new' ? 'rgba(0, 0, 255, 0.10)' : 
            card.status === 'learning' ? 'rgba(255, 0, 0, 0.10)' : 
            card.status === 'completed' ? 'rgb(0, 255, 0.10)' : 'lightgray' }}> 
                <div className='card-body'>
                    <div className='h6'> {card.question} </div>
                </div>
        </div>
    )
}

export default Cards;