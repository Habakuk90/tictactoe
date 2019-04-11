import { IBaseHubConnection } from './base.hubconnection';
import { HubConnection } from '@aspnet/signalr';

class BaseHubConnection implements IBaseHubConnection {
  private connection: HubConnection;
  public name: string;

  constructor(connection: HubConnection, name: string) {
    this.name = name;
    this.connection = connection;
  }

  getConnection() {
    return this.connection;
  }
}

interface IUserHubConnection {
  addCurrentUser(...args: any[]): Promise<any>;
  updateUserList(method: (...args: any[]) => void): void;
}


export class UserHubConnection extends BaseHubConnection implements IUserHubConnection {

  constructor(connection: HubConnection, name: string) {
    super(connection, name);
  }

  public addCurrentUser(...args: any[]): Promise<any> {
    return this.getConnection().invoke('AddCurrentUser', ...args);
  }

  public updateUserList(method: (...args: any[]) => void) {
    this.getConnection().on('UpdateUserList', method);
  }
}

