import { HubConnection } from '@aspnet/signalr';

export class ConnectionService {
    public connection: HubConnection;

    constructor() {
        this.connection = new HubConnection('/game');
    }

    getConnection() {
        return this.connection;
    }
}