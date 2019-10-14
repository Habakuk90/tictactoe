import { BaseHubConnection } from 'src/app/connections/base.hubconnection';

enum HomeConnMethods {
  BroadcastMessage = 'BroadcastMessage'
}

export class HomeHubConnection extends BaseHubConnection {

  connectionMethods = HomeConnMethods;

  constructor(name: string, public readonly route = 'chath') {
    super(name, route);
  }

  public sendAll(...args: any[]): Promise<any> {
    return this.getConnection().invoke(HomeConnMethods.BroadcastMessage, ...args);
  }
}

export class ChallengeResponse {
  constructor(public enemyName: string, public gameName: string, public response: string) {}
}
