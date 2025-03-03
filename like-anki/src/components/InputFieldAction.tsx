import React from 'react';
import InputField from './InputField';

interface Props { 
    name: string; // nome
    setName: React.Dispatch<React.SetStateAction<string>>; // set name dello stato
    handleAction: () => void; // handler per l'aggiunta
    actionName: string; // nome dell'azione
}

const InputFieldAction: React.FC<Props> = ({name, setName, handleAction, actionName}: Props) => {

  return (
    <div className="modal-body input-group my-1">
    { <InputField name={name} setName={setName} handleEnterKeyDown={handleAction} /> }
    <button type="button" className="btn btn-primary" onClick={handleAction}> {actionName} </button>
    </div>
  )
};

export default InputFieldAction;