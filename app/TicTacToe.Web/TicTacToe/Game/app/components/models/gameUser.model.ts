import { IGame } from "./game.model";

export interface IGameUser {
    name: string;
    currentConnectionId: string;
    isTurn?: boolean;
    selectedGame?: IGame;
}