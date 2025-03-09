import React from 'react'
import { useEffect } from 'react';

interface Props {
    body: string;
    placeholder: string;
    setBody: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<Props> = ({body, setBody, placeholder}: Props) => {
    // come per input, clean up function per pulire il campo di testo
    useEffect(() => {
        return () => {
            setBody(body);
        };
    }
    , []);

    return (
        <div>
            <textarea
                value={body}
                className="form-control"
                placeholder={placeholder}
                onChange={(e) => setBody(e.target.value)}
            />
        </div>
    )
};

export default TextArea;