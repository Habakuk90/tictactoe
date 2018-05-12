import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
@Injectable()
export class HubConnectionService {
  connection;

  constructor(configService: ConfigService) {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(configService.getApiURI() + '/signalR')
    .configureLogging(signalR.LogLevel.Information)
    .build();
  }

  getConnection(): HubConnection {
    return this.connection;
  }

  startConnection() {
    return this.connection.start();
  }
}
