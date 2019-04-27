import { BaseHubConnection } from './base.hubconnection';

export class GameHubConnection extends BaseHubConnection {
  constructor(connection: string, name: string) {
    super(connection, name);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }

  public startGame(...args: any[]): Promise<any>{
    return this.getConnection().invoke('StartGame', ...args);
  }
}
