import React from 'react'
import CardModel from '../model/CardModel';
import '../style/CardStyle.css';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { removeCardAndSync } from '../state/thunks';
import { AppDispatch, RootState } from '../state/store';
import { editCard } from '../state/CardsSlice';
import InputField from './ui/InputField';
import ButtonAction from './ui/ButtonAction';
import { motion, AnimatePresence } from "motion/react";
import Card from './Card';

interface Props {
    cardId: number;
    deckId: number;
}

const CardEdit: React.FC<Props> = ({ cardId, deckId }: Props) => {
    // utilizzo il dispatch per rimuovere ed editare la carta e prendo la carta dallo store
    const dispatch = useDispatch<AppDispatch>();
    const card = useSelector((state: RootState) => state.cards.cards.find((card) => card.id === cardId && card.deckId === deckId)) as CardModel;

    // stati per la modifica di una carta
    const [ editable, setEditable ] = React.useState<boolean>(false);
    const [ newQuestion, setNewQuestion ] = React.useState<string>('question');
    const [ newAnswer, setNewAnswer ] = React.useState<string>('answer');
    const handleEditable = () => {
        if (editable) setEditable(false);
        else setEditable(true);
    };

    // gestione della scomparsa della carta (per riempire i campi)
    React.useEffect(() => {
        if (card) {
            setNewQuestion(card.question);
            setNewAnswer(card.answer);
        } 
    }, [card]);
    
    if (!card) {
        return null;
    }

    return (
        <Card cardId={cardId}>
            <motion.div
                className="card-container"
                layout
                key={card.id}
                style={{ width: '100%' }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    scale: { type: "spring", visualDuration: 0.1, bounce: 0.2 },
                }}>
                <div className='card-content'>
                    <div className='card-body'>
                        <div className='mb-2'>
                            <MdDelete className='text-danger'
                                style={{ cursor: 'pointer', fontSize: '2rem' }}
                                onClick={() => {
                                    dispatch(removeCardAndSync({id: card.id, deckId: card.deckId}));
                                }} />
                            <CiEdit className='text-success'
                                style={{ cursor: 'pointer', fontSize: '2rem' }}
                                onClick={handleEditable} />
                        </div>

                        <div className='h3'> Status: {card.status} </div>
                        <hr />

                        <div className='h3'> Question </div>
                        {editable ?
                            <InputField name={newQuestion} setName={setNewQuestion} />
                            : <div className='h4'> {card.question} </div>}
                        <hr />

                        <div className='h3'> Answer </div>
                        {editable ?
                            <InputField name={newAnswer} setName={setNewAnswer} />
                            : <div className='h4'> {card.answer} </div>}

                        {editable ?
                            <ButtonAction text='Save' onClickAction={() => {
                                dispatch(editCard({ id: card.id, question: newQuestion, answer: newAnswer, deckId: card.deckId }));
                                handleEditable();
                            }} />
                            : null}
                    </div>
                </div>
            </motion.div>
        </Card>
    );
};

export default CardEdit;