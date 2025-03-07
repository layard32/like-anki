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

interface Props {
    cardId: number;
}

const Card: React.FC<Props> = ({ cardId }: Props) => {
    // utilizzo il dispatch per rimuovere ed editare la carta e prendo la carta dallo store
    const dispatch = useDispatch<AppDispatch>();
    const card = useSelector((state: RootState) => state.cards.find((card) => card.id === cardId)) as CardModel;
    
    // utilizzo useeffect per il caso in cui la carta attualmente selezionata venga eliminata
    const [ showCard, setShowCard ] = React.useState<boolean>(true);
    React.useEffect(() => {
        if (!card) setShowCard(false);
    }, [card]);

    // stati per la modifica di una carta
    const [ editable, setEditable ] = React.useState<boolean>(false);
    const [ newQuestion, setNewQuestion ] = React.useState<string>('question');
    const [ newAnswer, setNewAnswer ] = React.useState<string>('answer');
    const handleEditable = () => {
        if (editable) setEditable(false);
        else setEditable(true);
    };

    return (
        showCard ?
                <div className='card-container'>
                <div className='card-content'>
                    <div className='card-body'>

                        <div className='mb-2'> 
                            <MdDelete className='text-danger' 
                                    style={{ cursor: 'pointer', fontSize: '2rem' }} 
                                    onClick={() => {
                                        dispatch(removeCardAndSync(card.id));
                                        setShowCard(false);}}/>
                            <CiEdit className='text-success'
                                    style={{ cursor: 'pointer', fontSize: '2rem' }} 
                                    onClick={handleEditable}/>
                        </div>

                        <div className='h3'> Status: {card.status} </div>
                        <hr />

                        <div className='h3'> Question </div>
                        { editable ? 
                            <InputField name={newQuestion} setName={setNewQuestion}/>
                        :   <div className='h4'> {card.question} </div> }
                        <hr />

                        <div className='h3'> Answer </div>
                        { editable ? 
                            <InputField name={newAnswer} setName={setNewAnswer}/>
                        :   <div className='h4'> {card.answer} </div> }

                        { editable ? 
                            <ButtonAction text='Save' onClickAction={() => {
                                dispatch(editCard({id: card.id, question: newQuestion, answer: newAnswer}));
                                handleEditable(); }}/>
                            :   null}
                    </div>
                </div>
            </div>
        : null
    )
};

export default Card;