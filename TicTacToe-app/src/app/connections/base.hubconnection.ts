import { BehaviorSubject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { debuglog } from 'util';
import { environment } from 'src/environments/environment';

export interface IBaseHubConnection {
  name: string;
  isConnected: BehaviorSubject<boolean>;
  stopConnection(): Promise<void>;
}

export interface HubComponent {
  hub: IBaseHubConnection;
  registerOnMethods(): void;
}

enum BaseConnMethods {
  JoinGroup = 'JoinGroup',
  LeaveGroup = 'LeaveGroup',
  AddCurrentUser = 'AddCurrentUser'
}

export abstract class BaseHubConnection implements IBaseHubConnection {
  private connection: HubConnection;
  public name: string;
  abstract connectionMethods: object;

  isConnected = new BehaviorSubject<boolean>(false);

  constructor(name: string, protected route = 'base') {
    this.name = name;
    this.connection = this.buildConnection();
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.startConnection();
    } else {
      debuglog('already connected!');
    }
  }

  protected getConnection(): HubConnection {
    return this.connection;
  }

  protected startConnection(): Promise<void> {
    return this.connection.start().then(() => {
      this.isConnected.next(true);
    }, err => {
      this.isConnected.next(false);
      // error handling disconnect / reconnect / logout
      throw new Error(err);
    });
  }

  public stopConnection(): Promise<void> {
    Object.keys(this.connectionMethods).forEach(x => {
      this.off(x);
    });
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

  protected off(methodName: string): void {
    this.getConnection().off(methodName);
  }

  private buildConnection(): signalR.HubConnection {
    // const url = environment.signalR.baseUrl + route + this.getToken('auth_token');
    const url = environment.signalR.baseUrl + this.route;
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
