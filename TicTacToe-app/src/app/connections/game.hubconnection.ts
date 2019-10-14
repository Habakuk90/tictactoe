import { BaseHubConnection } from './base.hubconnection';

enum TTTConnMethods {
  TileClicked = 'TileClicked',
  TileChange = 'TileChange',
  SwitchTurn = 'SwitchTurn',
  GameOver = 'GameOver'
}

export class GameHubConnection extends BaseHubConnection {
  connectionMethods = TTTConnMethods;

  constructor(name: string, public readonly route = 'gameh') {
    super(name, route);
  }
}
