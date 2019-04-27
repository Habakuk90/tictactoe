import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from '../shared/services/game.service';
import { ModalService } from '../shared/modals/modal.service';

@Injectable()
export class TicTacToeService extends GameService {
  // Group Service?
  private _turnSubject = new BehaviorSubject<boolean>(false);
  isTurn = this._turnSubject.asObservable();

  private _hasWonSubject = new BehaviorSubject<boolean>(false);
  hasWon = this._hasWonSubject.asObservable();


  constructor(modalService: ModalService) {
    super(modalService);
  }

  switchTurn() {
    this._turnSubject.next(!this._turnSubject.value);
  }

  gameOver(groupName: string, winningTileId: string, winningLine: string) {
    if (winningTileId != null) {
      this._hasWonSubject.next(true);
    }

    this.hub.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.hub.getConnection()
          .invoke('GameOver', groupName, winningTileId, winningLine);
      }
    });
  }

  onTileChange(method: (...args: any[]) => void) {
    this.hub.getConnection().on('TileChange', method);
  }

  onSwitchTurn(method: (...args: any[]) => void) {
    this.hub.getConnection().on('SwitchTurn', method);
  }

  reset() {
    this._turnSubject.next(false);
    // TODOANDI stop
    // this.hub.stop();
  }
}
