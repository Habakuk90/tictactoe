import { IBaseHubConnection } from './base.hubconnection';
import { HubConnection } from '@aspnet/signalr';

export class GameHubConnection implements IBaseHubConnection {
  constructor(private connection: HubConnection, public name: string) {
  }

  getConnection() {
    return this.connection;
  }


  public onStartGame(method: (...args: any[]) => void) {
    this.connection.on('StartGame', method);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.connection.invoke('ChallengePlayer', ...args);
  }
}
