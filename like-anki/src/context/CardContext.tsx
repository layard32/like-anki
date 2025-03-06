import React, { useContext } from 'react';
import CardModel from '../model/CardModel';

// creo un contesto per lo state ed un contesto per il dispatch
const CardStateContext = React.createContext<CardModel[] | undefined>(undefined);
const CardDispatchContext = React.createContext<React.Dispatch<any> | undefined>(undefined);

// creo un provider che utilizzi l'hook usereducer e poi wrappi i provider sia deck che dispatch
interface Props {
    reducer: React.Reducer<CardModel[], any>;
    children: React.ReactNode;
}

export const CardProvider: React.FC<Props> = ({reducer, children}: Props) => {
    const [state, dispatch] = React.useReducer(reducer, []);

    return (
        <CardStateContext.Provider value={state}>
            <CardDispatchContext.Provider value={dispatch}>
                { children }
            </CardDispatchContext.Provider>
        </CardStateContext.Provider>
    );
}

// creo dei custom hooks per accedere allo stato e al dispatch (good pattern per evitare errori)
export const useDeckState = () => {
    const context = useContext(CardStateContext);
    if (context === undefined) {
        throw new Error('useDeckState must be used within a DeckProvider');
    }
    return context;
}
export const useDeckDispatch = () => {
    const context = useContext(CardDispatchContext);
    if (context === undefined) {
        throw new Error('useDeckDispatch must be used within a DeckProvider');
    }
    return context;
}