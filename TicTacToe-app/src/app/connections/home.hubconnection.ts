import { BaseHubConnection } from 'src/app/connections/base.hubconnection';

enum HomeConnectionInvoke {
  BroadcastMessage = 'BroadcastMessage'
}

enum HomeConnectionOn {
  SendMessage = 'SendMessage'
}

export class HomeHubConnection extends BaseHubConnection {

  invokeMethdos = HomeConnectionInvoke;

  onMethods = HomeConnectionOn;

  constructor(name: string, public readonly route = 'chath') {
    super(name, route);
  }

  public sendAll(...args: any[]): Promise<any> {
    return this.getConnection().invoke(this.invokeMethdos.BroadcastMessage, ...args);
  }

  public onSendMessage(method: (...args: any[]) => void) {
    this.getConnection().on(this.onMethods.SendMessage, method);
  }
}

export class ChallengeResponse {
  constructor(public enemyName: string, public gameName: string, public response: string) { }
}
