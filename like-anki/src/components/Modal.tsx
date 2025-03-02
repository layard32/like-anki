import React from 'react';
import InputFieldAdd from './InputFieldAction';

interface Props {
    handleModal: () => void;
    dispatch: React.Dispatch<any>;
}

const Modal: React.FC<Props> = ({ handleModal, dispatch }: Props) => {
    // stato per il nome del deck
    const [deckName, setDeckName] = React.useState<string>('');

    // logica per aggiunta del deck
    const handleAddDeck = () => {
        if (deckName !== '') {
            dispatch({ type: 'ADD-DECK', payload: deckName });
            handleModal();
        }
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Deck</h5>
                        <button type="button" className="btn-close" onClick={handleModal}></button>
                    </div>
                    <InputFieldAdd name={deckName} setName={setDeckName} handleAction={handleAddDeck} actionName='Add deck'/>
                </div>
            </div>
        </div>
    );
};

export default Modal;