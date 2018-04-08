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

    startConnection():Promise<void> {
        var that = this;
        this.connection = new HubConnection('/signalR');
        return this.connection.start();
    }
}
