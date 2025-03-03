import React, {useEffect, useRef} from 'react'

interface Props {
    name: string; // nome
    setName: React.Dispatch<React.SetStateAction<string>>; // set name dello stato
    handleEnterKeyDown?: () => void; // opzionale: se usato con inputfieldaction, consente
    // di svolgere l'azione anche tramite la pressione del tasto enter
}

const InputField: React.FC<Props> = ({name, setName, handleEnterKeyDown}: Props) => {
    // effect hook per mettere focus quando viene montata e rimuovere il testo quando viene smontata
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        // clean up function
        // TOFIX: the clean up deletes the name when a new inputfield is mounted 
        // return () => {
        //     setName('');
        // }
    }, []);

    return (
        <input
        type="text"
        className="form-control"
        placeholder="Type the deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
            if (handleEnterKeyDown && e.key === 'Enter') {
                handleEnterKeyDown();
            }
        }}
        ref={inputRef}
        />
        )
};

export default InputField;