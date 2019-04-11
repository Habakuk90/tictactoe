import { HubConnection } from '@aspnet/signalr';
import { IBaseHubConnection } from './user.hubconnection';

export class Hub<T extends IBaseHubConnection> {
  public connection: HubConnection;
  public hub: T;


  constructor(hub: T) {
    this.connection = hub.getConnection();
    this.start();
    this.hub = hub;
  }

  async start() {
    await this.connection.start();
    this.hub.isConnected.next(true);
  }

  async stop() {
    await this.connection.stop();
  }
}
