import React from 'react'
import { useParams } from 'react-router-dom';

interface Props {

}

const DeckShow: React.FC<Props> = ({}: Props) => {
    // utilizzo l'useParams hook per prendere il parametro della nested route
    const { deckId } = useParams<{ deckId: string }>();

    return (
        <div>
            Deck id: { deckId }
        </div>
    )
};

export default DeckShow