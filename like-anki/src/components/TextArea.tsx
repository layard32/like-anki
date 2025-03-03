import React from 'react'

interface Props {
    body: string;
    placeholder: string;
    setBody: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<Props> = ({body, setBody, placeholder}: Props) => {
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