import { BaseHubConnection } from './base.hubconnection';

enum TTTConnMethods {
  TileClicked = 'TileClicked',
  TileChange = 'TileChange',
  SwitchTurn = 'SwitchTurn',
  GameOver = 'GameOver'
}

export class GameHubConnection extends BaseHubConnection {
  connectionMethods = TTTConnMethods;

  constructor(connection: string, name: string) {
    super(connection, name);
  }

  public hello(...args:any[]): Promise<any> {
    return this.getConnection().invoke('Hello', ...args);
  }

  public onHello(method: (...args: any[]) => void) {
    this.isConnected.subscribe(x => {
      if (x) {
        this.getConnection().on('Hello', method);
      }
    });
  }
  // game method
  // public onGameOver(method: (...args: any[]) => void) {
  //   this.getConnection().on(TTTConnMethods.GameOver, method);
  // }

  // public gameOver(...args: any[]) {
  //   return this.getConnection().invoke(TTTConnMethods.GameOver, ...args);
  // }

  // // TTT methods maybe auslagern
  // public tileClicked(...args: any[]): Promise<any> {
  //   return this.getConnection().invoke(TTTConnMethods.TileClicked, ...args);
  // }

  // public onTileChange(method: (...args: any[]) => void) {
  //   return this.getConnection().on(TTTConnMethods.TileChange, method);
  // }

  // public onSwitchTurn(method: (...args: any[]) => void) {
  //   this.getConnection().on(TTTConnMethods.SwitchTurn, method);
  // }
}
