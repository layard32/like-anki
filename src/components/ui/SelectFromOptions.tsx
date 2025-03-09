import React from 'react'

interface Props {
    options: string[];
    setOptions: (name: string) => void;
}

const SelectFromOptions: React.FC<Props> = ({options, setOptions}: Props) => {
    // per assicurarsi non ci siano bug se il deckId è minore di -1, anche se è impossibile
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.selectedIndex > 0) {
            setOptions(e.target.value);
        }
    };

    return (
        <div>
            <select className="form-select" 
                    onChange={handleChange}>
                <option value='-1'>Select a deck</option> 
                { options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
};

export default SelectFromOptions;