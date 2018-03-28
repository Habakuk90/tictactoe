import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class GameHubConnection {
    public connection: HubConnection;

    constructor() {
        let connection = new Connection(new HubConnection('/game'));
    }

    getConnection() {
        return this.connection;
    }

    startConnection() {
        this.connection = new HubConnection('/game');
        this.connection.start();
    }
}

class Connection {
    connection: HubConnection;
    constructor(connection: HubConnection) {
        this.connection = connection;
    }
    public startConnection() {
        //this.connection = new HubConnection('/game');
        this.connection.start();
    }
    
}