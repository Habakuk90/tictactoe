import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { IGameUser } from "./gameUser.model";

@Injectable()
export class GameHubConnection {
    public connection: HubConnection;
    public enemyUser: IGameUser;
    public currentUser: IGameUser;
    constructor() {
    }

    getConnection() {
        return this.connection;
    }

    startConnection() {
        var that = this;
        this.connection = new HubConnection('/game');
        this.connection.start().then(() => {
            this.connection.invoke('GetConnectedUser');
        });
    }
}
