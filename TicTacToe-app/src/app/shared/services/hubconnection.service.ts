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

  async startConnection() {
    let tokenValue = '';
    const token = localStorage.getItem('auth_token');
    if (token !== '') {
        tokenValue = '?token=' + token;
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.configService.getApiURI() + '/signalR' + tokenValue)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    await this.connection.start();
    this.connection.invoke('SendMessage').then(a => console.log(a));
    this.connection.on('hallo', (a) => console.log(a));
    this._connectionBehaviour.next(true);
  }

  async stopConnection() {
    await this.connection.stop();
    this._connectionBehaviour.next(false);
  }
}
