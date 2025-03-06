import React, { useContext, useEffect } from 'react';
import CardModel from '../model/CardModel';
import { saveData, loadData } from '../localforageUtils';

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
    
    // implemento il save / load da localforage nel contesto, per mantenere persistance
    // loading iniziale
    const [loaded, setLoaded] = React.useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            const storedCards: CardModel[] = await loadData('cards') as CardModel[];
            if (storedCards) dispatch({ type: 'INIT', payload: storedCards });
            setLoaded(true);
        };
        fetchData();
    }, []);
    // salvataggio ad ogni cambiamento
    useEffect(() => {
        if (loaded) saveData('cards', state);
    }, [state, loaded]);

    return (
        <CardStateContext.Provider value={state}>
            <CardDispatchContext.Provider value={dispatch}>
                { children }
            </CardDispatchContext.Provider>
        </CardStateContext.Provider>
    );
}

// creo dei custom hooks per accedere allo stato e al dispatch (good pattern per evitare errori)
export const useCardState = () => {
    const context = useContext(CardStateContext);
    if (context === undefined) {
        throw new Error('useCardState must be used within a CardProvider');
    }
    return context;
}
export const useCardDispatch = () => {
    const context = useContext(CardDispatchContext);
    if (context === undefined) {
        throw new Error('useCardDispatch must be used within a CardProvider');
    }
    return context;
}