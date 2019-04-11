import { HubConnection } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';


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

  public onStartGame(method: (...args: any[]) => void) {
    this.getConnection().on('StartGame', method);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }
}

