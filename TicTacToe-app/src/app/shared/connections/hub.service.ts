import { BaseHubConnection } from './base.hubconnection';
import { Injectable } from '@angular/core';
import { debuglog } from 'util';


class HubFactory {
  constructor(private route: string, private name: string) { }

  createConnection<T extends BaseHubConnection>(type: new (route: string, name: string) => T): T {
    if (type != null && typeof type === typeof BaseHubConnection) {
      const conn = new type(this.route, this.name);
      return conn;
    } else {
      throw new Error('Error with given type');
    }
  }
}

@Injectable()
export class HubService {
  private hubs: Array<BaseHubConnection> = [];

  constructor() { }

  public getByHub(hub: BaseHubConnection): BaseHubConnection {
    return this.hubs.filter(x => x === hub)[0] || null;
  }

  public getByName<T extends BaseHubConnection>(name: string): T {
    return <T>this.hubs.filter(x => x.name === name)[0] || null;
  }

  public getByType<T extends BaseHubConnection>(type: T): T {
    return <T>this.hubs.filter(x => typeof type === typeof x)[0] || null;
  }

  public createConnection<T extends BaseHubConnection>(
    route: string, name: string,
    type: new (route: string, name: string) => T): T {

    if (route.length > 0 && name.length > 0) {
      const hubConnection = new HubFactory(route, name).createConnection(type);
      this.add(hubConnection);

      return hubConnection;
    } else {
      throw new Error(`could not create connection. route: ${route}; name: ${name}`);
    }
  }

  public stopConnection(hub: BaseHubConnection): void {
    const that = this;
    if (hub) {
      hub.stopConnection().then(() => {
        hub.isConnected.next(false);
        that.remove(hub);
      });
    }
  }

  private add(hub: BaseHubConnection): void {
    if (hub) {
      this.hubs.push(hub);
    } else {
      debuglog('could not add, because given hub is empty');
    }
  }

  private remove(hub: BaseHubConnection): void {
    const index = this.hubs.indexOf(hub);
    if (index > -1) {
      this.hubs = this.hubs.splice(index, 1);
    } else {
      debuglog('couldn\'t remove, because hub does not exists.');
    }
  }
}

