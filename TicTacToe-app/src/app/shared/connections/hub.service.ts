import { BaseHubConnection } from './base.hubconnection';
import { Injectable } from '@angular/core';
import { debuglog } from 'util';


class HubFactory {
  constructor(private route: string, private name: string) { }

  createConnection<T extends BaseHubConnection>(type: new (route: string, name: string) => T): T {
    const conn = new type(this.route, this.name);
    return conn;
  }
}

@Injectable()
export class HubService {
  private hubs: Array<BaseHubConnection> = [];

  constructor() { }

  private add(hub: BaseHubConnection) {
    this.hubs.push(hub);
  }

  private remove(hub: BaseHubConnection) {
    const index = this.hubs.indexOf(hub);
    if (index > -1) {
      this.hubs = this.hubs.splice(index, 1);
    } else {
      debuglog('couldn\'t remove, because hub does not exists.');
    }
  }

  public get(hub: BaseHubConnection) {
    return this.hubs.filter(x => x === hub)[0] || null;
  }

  public getByName<T extends BaseHubConnection>(name: string): T {
    return <T>this.hubs.filter(x => x.name === name)[0] || null;
  }

  public createConnection<T extends BaseHubConnection>(
    route: string, name: string,
    type: new (route: string, name: string) => T): T {

    const hubConnection = new HubFactory(route, name).createConnection(type);
    this.add(hubConnection);
    return hubConnection;
  }

  public stopConnection(hub: BaseHubConnection): void {
    const that = this;
    hub.stopConnection().then(x => {
      this.remove(hub);
      console.log(x);
    });
  }
}

