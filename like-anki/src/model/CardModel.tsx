interface CardModel {
    id: number;
    content: string;
    status: 'new' | 'learning' | 'completed';
}

export default CardModel;