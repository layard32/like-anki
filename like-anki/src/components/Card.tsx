import React from 'react'
import CardModel from '../model/CardModel';
import '../style/CardStyle.css';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface Props {
    card: CardModel;
}

const Card: React.FC<Props> = ({ card }: Props) => {
        
    return (
        <div className='card-container'>
            <div className='card-content'>
                <div className='card-body'>
                    {/* <MdDelete className='text-danger' style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={() => { 
                        dispatch({ type: 'REMOVE-CARD', payload: card.id });
                        console.log(card.id)}}/> */}
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
    )
};

export default Card;