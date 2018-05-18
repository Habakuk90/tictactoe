import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class HubConnectionService {
  connection;
  isConnected = false;
  constructor(configService: ConfigService) {
    let tokenValue = '';
    const token = localStorage.getItem('auth_token');
    if (token !== '') {
        tokenValue = '?token=' + token;
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(configService.getApiURI() + '/signalR' + tokenValue)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  getConnection(): HubConnection {
    return this.connection;
  }

  startConnection() {
    return this.connection.start().then(() => this.isConnected = true);
  }
}
