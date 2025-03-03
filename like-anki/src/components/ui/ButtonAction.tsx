import React from 'react'
import { IconType } from 'react-icons'

interface Props {
    text?: string;
    Icon?: IconType;
    onClickAction: () => void;
}

const ButtonAction: React.FC<Props> = ({text, Icon, onClickAction}: Props) => {
    return (
        <div>
            <button className='btn btn-primary ms-2 my-3'
                    onClick={onClickAction}> 
                    { text ? text : null} 
                    { Icon? <Icon /> : null} </button>
        </div>
    )
};

export default ButtonAction;