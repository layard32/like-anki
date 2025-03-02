import React, { useEffect, useRef } from 'react';

interface Props { 
    name: string; // nome
    setName: React.Dispatch<React.SetStateAction<string>>; // set name dello stato
    handleAction: () => void; // handler per l'aggiunta
    actionName: string; // nome dell'azione
}

const InputFieldAction: React.FC<Props> = ({name, setName, handleAction, actionName}: Props) => {
    // effect hook per mettere focus quando viene montata e rimuovere il testo quando viene smontata
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        // clean up function
        return () => {
            setName('');
        }
    }, []);

  return (
    <div className="modal-body input-group my-1">
    <input
        type="text"
        className="form-control"
        placeholder="Type the deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleAction();
            }
        }}
        ref={inputRef}
    />
    <button type="button" className="btn btn-primary" onClick={handleAction}> {actionName} </button>
    </div>
  )
}

export default InputFieldAction