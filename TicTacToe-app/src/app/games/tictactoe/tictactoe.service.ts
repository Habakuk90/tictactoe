import { Injectable } from '@angular/core';
import { GameService } from '../game.service';

enum TTTConnMethods {
  TileClicked = 'TileClicked',
  TileChange = 'TileChange',
  SwitchTurn = 'SwitchTurn'
}


@Injectable()
export class TicTacToeService extends GameService {
  constructor() {
    super();
  }

  public tileClicked(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke(TTTConnMethods.TileClicked, ...args);
  }

  public onTileChange(method: (...args: any[]) => void) {
    return this.hub.getConnection().on(TTTConnMethods.TileChange, method);
  }

  public onSwitchTurn(method: (...args: any[]) => void) {
    this.hub.getConnection().on(TTTConnMethods.SwitchTurn, method);
  }

  reset() {
    this.hub.off('SwitchTurn');
    this.hub.off('TileChange');
    this.hub.off('SwitchTurn');
    this.hub.off('GameOver');
    this.hub.getConnection().stop();
  }
}
