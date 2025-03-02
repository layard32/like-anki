interface CardModel {
    id: number;
    question: string;
    answer: string;
    status: 'new' | 'learning' | 'completed';
    deckId: number;
}

export default CardModel;