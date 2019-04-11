import { HubConnection } from '@aspnet/signalr';
import { BaseHubConnection } from './base.hubconnection';

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

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }

  public updateUserList(method: (...args: any[]) => void) {
    this.getConnection().on('UpdateUserList', method);
  }

  public onStartGame(method: (...args: any[]) => void) {
    this.getConnection().on('StartGame', method);
  }
}

