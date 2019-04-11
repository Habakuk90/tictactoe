import { HubConnection } from '@aspnet/signalr';
import { BaseHubConnection } from './user.hubconnection';

export class GameHubConnection extends BaseHubConnection {
  constructor(connection: HubConnection, name: string) {
    super(connection, name);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }
}
