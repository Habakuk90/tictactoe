import { BaseHubConnection } from './base.hubconnection';
import { Injectable } from '@angular/core';
import { debuglog } from 'util';

@Injectable({
  providedIn: 'root'
})
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

