import { BaseHubConnection } from '../shared/connections/base.hubconnection';

interface IGameHubConnection {
  challengePlayer(...args: any[]): Promise<any>;
  startGame(...args: any[]): Promise<any>;
}

export class GameHubConnection extends BaseHubConnection implements IGameHubConnection {
  constructor(connection: string, name: string) {
    super(connection, name);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }

  public startGame(...args: any[]): Promise<any> {
    return this.getConnection().invoke('StartGame', ...args);
  }
}
