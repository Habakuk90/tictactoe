import { BaseHubConnection } from './base.hubconnection';

enum GameConnectionInvoke {
}

enum GameConnectionOn {
}


export class GameHubConnection extends BaseHubConnection {

  invokeMethdos = GameConnectionInvoke;

  onMethods = GameConnectionOn;

  constructor(name: string, public readonly route = 'gameh') {
    super(name, route);
  }
}
