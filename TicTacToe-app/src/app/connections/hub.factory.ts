import { BaseHubConnection } from './base.hubconnection';

export class HubFactory {
  constructor(private name: string) { }

  createConnection<T extends BaseHubConnection>(type: new (name: string, route?: string) => T): T {
    if (type != null && typeof type === typeof BaseHubConnection) {
      const conn = new type(this.name);
      return conn;
    } else {
      throw new Error('Error with given type');
    }
  }
}
