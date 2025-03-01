import React from 'react'
import DeckModel from '../model/DeckModel'

type DeckAction = 
    | { type: 'ADD-DECK', payload: string }
    | { type: 'REMOVE-DECK', payload: number }
    | { type: 'EDIT-DECK', payload: { id: number, text: string} }

const DeckReducer = (state: DeckModel[], action: DeckAction) => {
    switch (action.type) {
        case 'ADD-DECK':
            return state
        case 'REMOVE-DECK':
            return state
        case 'EDIT-DECK':
            return state
        default:
            return state;
    } 
}

export default DeckReducer
