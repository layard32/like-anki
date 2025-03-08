import React from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonAction from './ui/ButtonAction';

const DeckLearn = () => {
    // reindirizzazione alla homepage
    const navigate = useNavigate();
    const handleRedirectionToHomePage = () => {
        navigate('/');
    };

    return (
        <div>
            <ButtonAction onClickAction={handleRedirectionToHomePage} text='Go back' />

            <div className='d-flex align-items-center justify-content-center' >
                <div className='mb-3'>
                    <button className='btn btn-primary me-1'> Ok </button>
                    <button className='btn btn-secondary'> Not ok </button>
                </div>
            </div>

            
        </div>
    )
};

export default DeckLearn;