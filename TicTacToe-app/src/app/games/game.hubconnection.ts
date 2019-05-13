import { BaseHubConnection } from '../shared/connections/base.hubconnection';

interface IGameHubConnection {
  challengePlayer(...args: any[]): Promise<any>;
  startGame(...args: any[]): Promise<any>;
}

export class GameHubConnection extends BaseHubConnection {
  constructor(connection: string, name: string) {
    super(connection, name);
  }
}
