import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { IGameUser } from "./gameUser.model";

@Injectable()
export class GameHubConnection {
    public connection: HubConnection;
    public enemyUser: IGameUser;
    public currentUser: IGameUser;
    constructor() {
        let connection = new HubConnection('/game');
    }

    getConnection() {
        return this.connection;
    }

    startConnection() {
        this.connection = new HubConnection('/game');
        this.connection.start();
    }
}
