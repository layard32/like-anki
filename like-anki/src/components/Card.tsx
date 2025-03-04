import React from 'react'
import CardModel from '../model/CardModel'

interface Props {
    card: CardModel;
}

const Card: React.FC<Props> = ({card}: Props) => {
    
    
    return (
        <div className='card mt-3 mb-2' style={{ borderRadius: '10px', 
            backgroundColor: card.status === 'new' ? 'rgba(0, 0, 255, 0.40)' : 
            card.status === 'learning' ? 'rgba(255, 0, 0, 0.40)' : 
            card.status === 'completed' ? 'rgb(0, 255, 0.40)' : 'lightgray' }}> 
                <div className='card-body'>
                    <div className='h5'> Question: </div>
                    <div className='h6'> {card.question} </div>
                    <hr />
                    <div className='h5'> Answer: </div>
                    <div className='h6'> {card.answer} </div>
                </div>
        </div>
    )
}

export default Card;