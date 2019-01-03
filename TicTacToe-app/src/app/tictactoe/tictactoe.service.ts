import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { GameService } from '../shared/services/game.service';
import { ModalService } from '../shared/modals/modal.service';

@Injectable()
export class TicTacToeService extends GameService {
  // Group Service?
  private _turnSubject = new BehaviorSubject<boolean>(false);
  isTurn = this._turnSubject.asObservable();

  private _hasWonSubject = new BehaviorSubject<boolean>(false);
  hasWon = this._hasWonSubject.asObservable();

  constructor(connectionService: HubConnectionService,
      modalService: ModalService) {
    super(connectionService, modalService);
  }

  switchTurn() {
    this._turnSubject.next(!this._turnSubject.value);
  }

  gameOver(groupName: string, winningTileId: string, winningLine: string) {
    if (winningTileId != null) {
      this._hasWonSubject.next(true);
    }

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connectionService.connection
          .invoke('GameOver', groupName, winningTileId, winningLine);
      }
    });
  }

  onTileChange(method: (...args: any[]) => void) {
    this.connectionService.connection.on('TileChange', method);
  }

  onSwitchTurn(method: (...args: any[]) => void) {
    this.connectionService.connection.on('SwitchTurn', method);
  }

  reset() {
    this._turnSubject.next(false);
  }
}
