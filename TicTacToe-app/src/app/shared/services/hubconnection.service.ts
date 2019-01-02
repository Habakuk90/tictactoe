import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class HubConnectionService {
  connection: HubConnection;
  _connectionBehaviour = new BehaviorSubject<boolean>(false);
  isConnected = this._connectionBehaviour.asObservable();
  constructor(private configService: ConfigService) {

  }

  getConnection(): HubConnection {
    return this.connection;
  }

  startConnection(socketUri) {
    let tokenValue = '';
    const token = localStorage.getItem('auth_token');
    if (token !== '') {
        tokenValue = '?token=' + token;
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.configService.getApiURI() + socketUri + tokenValue)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    return this.connection.start().then(() => {
      this._connectionBehaviour.next(true);
    });
  }

  stopConnection() {
    return this.connection.stop().then(() => {
      this._connectionBehaviour.next(false);
    });
  }
}
