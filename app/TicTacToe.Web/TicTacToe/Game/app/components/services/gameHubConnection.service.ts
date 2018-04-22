import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { IGameUser } from "./gameUser.model";
//[TODO] Set Connection when app ready / remove the error
// failed to connect when not in connection state
@Injectable()
export class GameHubConnection {
    public connection: HubConnection = new HubConnection('/signalR');
    public enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
    public currentUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
    constructor() {
    }

    getConnection() : HubConnection {
        return this.connection;
    }

    startConnection(): Promise<void> {
        // this.connection = new HubConnection('/signalR');
        return this.connection.start();
    }
}
