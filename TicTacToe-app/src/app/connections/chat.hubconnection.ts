import { BaseHubConnection } from 'src/app/connections/base.hubconnection';

enum ChatConnectionInvoke {
  BroadcastMessage = 'BroadcastMessage'
}

enum ChatConnectionOn {
  SendMessage = 'SendMessage'
}

export class ChatHubConnection extends BaseHubConnection {
  connectionMethods: object;

  invokeMethdos = ChatConnectionInvoke;

  onMethods = ChatConnectionOn;

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
