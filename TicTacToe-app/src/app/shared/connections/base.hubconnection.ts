import { BehaviorSubject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
import * as signalR from '@aspnet/signalr';

export interface IBaseHubConnection {
  name: string;
  isConnected: BehaviorSubject<boolean>;
  getConnection(): HubConnection;
  stopConnection(): Promise<void>;
}


export class BaseHubConnection implements IBaseHubConnection {
  private connection: HubConnection;
  public name: string;

  isConnected = new BehaviorSubject<boolean>(false);

  constructor(connection: string, name: string) {
    this.name = name;
    this.connection = this.buildConnection(connection);
    this.connection.start().then(() => {
      this.isConnected.next(true);
    });
  }

  public getConnection(): HubConnection {
    return this.connection;
  }

  public stopConnection(): Promise<void> {
    return this.connection.stop();
  }

  private buildConnection(socketUri: string): signalR.HubConnection {
    const configService = new ConfigService();

    const url = configService._apiURI + socketUri + this.getToken('auth_token');

    return new signalR.HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  private getToken(tokenName: string): string {
    let tokenValue = '';
    const token = localStorage.getItem(tokenName);

      if (token !== '') {
        tokenValue = '?token=' + token;
    }

    return tokenValue;
  }
}

