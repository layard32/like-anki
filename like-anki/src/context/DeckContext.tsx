import React, { useContext } from 'react';
import DeckModel from '../model/DeckModel';

// creo un contesto per lo state ed un contesto per il dispatch
const DeckStateContext = React.createContext<DeckModel[] | undefined>(undefined);
const DeckDispatchContext = React.createContext<React.Dispatch<any> | undefined>(undefined);

// creo un provider che utilizzi l'hook usereducer e poi wrappi i provider sia deck che dispatch
interface Props {
    reducer: React.Reducer<DeckModel[], any>;
    children: React.ReactNode;
}

export const DeckProvider: React.FC<Props> = ({reducer, children}: Props) => {
    const [state, dispatch] = React.useReducer(reducer, []);

    return (
        <DeckStateContext.Provider value={state}>
            <DeckDispatchContext.Provider value={dispatch}>
                { children }
            </DeckDispatchContext.Provider>
        </DeckStateContext.Provider>
    );
}

// creo dei custom hooks per accedere allo stato e al dispatch (good pattern per evitare errori)
export const useDeckState = () => {
    const context = useContext(DeckStateContext);
    if (context === undefined) {
        throw new Error('useDeckState must be used within a DeckProvider');
    }
    return context;
}
export const useDeckDispatch = () => {
    const context = useContext(DeckDispatchContext);
    if (context === undefined) {
        throw new Error('useDeckDispatch must be used within a DeckProvider');
    }
    return context;
}