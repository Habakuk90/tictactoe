import { BehaviorSubject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';

export interface IBaseHubConnection {
  name: string;
  isConnected: BehaviorSubject<boolean>;
  getConnection(): HubConnection;
}


export class BaseHubConnection implements IBaseHubConnection {
  private connection: HubConnection;
  public name: string;

  _connectionBehaviour = new BehaviorSubject<boolean>(false);
  isConnected = new BehaviorSubject<boolean>(false);

  constructor(connection: HubConnection, name: string) {
    this.name = name;
    this.connection = connection;
  }

  getConnection() {
    return this.connection;
  }
}

