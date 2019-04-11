import { HubConnection } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

export interface IBaseHubConnection {
  name: string;
  getConnection(): HubConnection;
}


export class Hub<T extends IBaseHubConnection> {
  public connection: HubConnection;
  public hub: T;

  _connectionBehaviour = new BehaviorSubject<boolean>(false);
  isConnected = this._connectionBehaviour.asObservable();

  constructor(hub: T) {
    this.connection = hub.getConnection();
    this.start();
    this.hub = hub;
  }

  async start() {
    await this.connection.start();
    this._connectionBehaviour.next(true);
  }

  async stop() {
    await this.connection.stop();
    this._connectionBehaviour.next(false);
  }
}
