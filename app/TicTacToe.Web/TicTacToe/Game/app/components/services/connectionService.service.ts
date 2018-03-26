import { HubConnection } from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {
    public connection: HubConnection;

    constructor() {
    }

    getConnection() {
        return this.connection;
    }

    startConnection() {
        this.connection = new HubConnection('/game');
        this.connection.start();
    }

}