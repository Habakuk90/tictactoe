import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from '../game.service';

@Injectable()
export class TicTacToeService extends GameService {
  constructor() {
    super();
  }

  public tileClicked(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke('TileClicked', ...args);
  }

  public onTileChange(method: (...args: any[]) => void) {
    return this.hub.getConnection().on('TileChange', method);
  }

  public onSwitchTurn(method: (...args: any[]) => void) {
    this.hub.getConnection().on('SwitchTurn', method);
  }

  reset() {
    this.hub.off('SwitchTurn');
    this.hub.off('TileChange');
    this.hub.off('SwitchTurn');
    this.hub.off('GameOver');
    this.hub.getConnection().stop();
  }
}
