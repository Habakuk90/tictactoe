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

export interface HubComponent {
  registerOnMethods(): void;
}

enum BaseConnMethods {
  JoinGroup = 'JoinGroup',
  LeaveGroup = 'LeaveGroup',
  AddCurrentUser = 'AddCurrentUser'
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
    }, err => {
      this.isConnected.next(false);
      // error handling disconnect / reconnect / logout
      throw new Error(err);
    });
  }

  public getConnection(): HubConnection {
    return this.connection;
  }

  public stopConnection(): Promise<void> {
    return this.connection.stop();
  }

  public joinGroup(...args: any[]): Promise<any> {
    return this.getConnection().invoke(BaseConnMethods.JoinGroup, ...args);
  }

  public leaveGroup(...args: any[]): Promise<any> {
    return this.getConnection().invoke(BaseConnMethods.LeaveGroup, ...args);
  }

  public addCurrentUser(...args: any[]): Promise<any> {
      return this.getConnection().invoke(BaseConnMethods.AddCurrentUser, ...args);
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

