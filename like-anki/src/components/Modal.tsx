import React, { useEffect, useRef } from 'react';

interface Props {
    handleModal: () => void;
    dispatch: React.Dispatch<any>;
}

const Modal: React.FC<Props> = ({ handleModal, dispatch }: Props) => {
    // stato per il nome del deck
    const [deckName, setDeckName] = React.useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // effect hook per mettere subito focus sull'input
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
                    <div className="modal-body input-group my-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type the deck name"
                            value={deckName}
                            onChange={(e) => setDeckName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddDeck();
                                }
                            }}
                            ref={inputRef}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleAddDeck}> Add Deck </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;