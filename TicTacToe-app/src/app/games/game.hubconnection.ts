import { BaseHubConnection } from '../shared/connections/base.hubconnection';

export class GameHubConnection extends BaseHubConnection {
  constructor(connection: string, name: string) {
    super(connection, name);
  }
}
