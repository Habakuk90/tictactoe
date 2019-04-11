import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
import { Hub, IBaseHubConnection } from '../connections/base.hubconnection';

@Injectable()
export class HubConnectionService<T extends IBaseHubConnection> {
  _connectionBehaviour = new BehaviorSubject<boolean>(false);
  isConnected = this._connectionBehaviour.asObservable();
  hub: Hub<T>;

  constructor(private configService: ConfigService) {
  }

  async createHubConnection (hub: T) {
    const connection = new Hub<T>(hub);

    // this.hub = connection;
    this._connectionBehaviour.next(true);

    return connection;
  }

  async stopConnection() {
    await this.hub.connection.stop();
    this._connectionBehaviour.next(false);
  }

  buildConnection(socketUri: string): signalR.HubConnection {
    let url = this.configService._apiURI + socketUri + this.getToken('auth_token');

    return new signalR.HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  private getToken(tokenName: string) {
    let tokenValue = '';
    const token = localStorage.getItem('auth_token'); //<= insert tokenname
    if (token !== '') {
        tokenValue = '?token=' + token;
    }

    return tokenValue;
  }
}
