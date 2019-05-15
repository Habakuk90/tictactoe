import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from '../game.service';

@Injectable()
export class TicTacToeService extends GameService {
  private _turnSubject = new BehaviorSubject<boolean>(false);
  isTurn = this._turnSubject.asObservable();

  private _hasWonSubject = new BehaviorSubject<boolean>(false);
  hasWon = this._hasWonSubject.asObservable();

  constructor() {
    super();
  }

  switchTurn() {
    this._turnSubject.next(!this._turnSubject.value);
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
    this._turnSubject.next(false);
    this.hub.off('SwitchTurn');
    this.hub.off('TileChange');
    this.hub.off('SwitchTurn');
    this.hub.off('GameOver');
    this.hub.getConnection().stop();
  }
}
