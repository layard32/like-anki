import CardModel from "./CardModel";

interface DeckModel {
    id: number;
    name: string;
    completedCards: number;
    learningCards: number;
    newCards: number;
}

export default DeckModel;