import React from 'react'
import { urlToHttpOptions } from 'url';

interface Props {
    options: string[];
    // setOptions: React.Dispatch<React.SetStateAction<any[]>>;
}

const SelectFromOptions: React.FC<Props> = ({options}: Props) => {
    
    return (
        <div>
            <select className="form-select"> 
                { options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
};

export default SelectFromOptions;