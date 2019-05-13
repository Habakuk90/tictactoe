import { BehaviorSubject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';
import { ConfigService } from '../utils/config.service';
import * as signalR from '@aspnet/signalr';

export interface IBaseHubConnection {
  name: string;
  isConnected: BehaviorSubject<boolean>;
  addCurrentUser(...args: any[]): void;
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

  public joinGroup(...args: any[]): Promise<any> {
    return this.getConnection().invoke('JoinGroup', ...args);
  }

  public leaveGroup(...args: any[]): Promise<any> {
    return this.getConnection().invoke('LeaveGroup', ...args);
  }

  public addCurrentUser(...args: any[]): Promise<any> {
      return this.getConnection().invoke('AddCurrentUser', ...args);
  }

  public off(methodName: string): void {
    this.getConnection().off(methodName);
  }

  public stop(): Promise<void> {
    return this.getConnection().stop();
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

