import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { GameService } from '../shared/services/game.service';
import { ModalService } from '../shared/modals/modal.service';
import { GameHubConnection } from '../shared/connections/game.hubconnection';
import { Hub } from '../shared/connections/base.hubconnection';

@Injectable()
export class TicTacToeService extends GameService {
  // Group Service?
  private _turnSubject = new BehaviorSubject<boolean>(false);
  isTurn = this._turnSubject.asObservable();

  private _hasWonSubject = new BehaviorSubject<boolean>(false);
  hasWon = this._hasWonSubject.asObservable();

  hub: Hub<GameHubConnection>;

  constructor(connectionService: HubConnectionService<GameHubConnection>,
      modalService: ModalService) {
    super(connectionService, modalService);
    // fix reconnect via /tictactoe route => skip new connection
      // move to 'GameService'?
    const hub = new GameHubConnection(connectionService.buildConnection('/tictactoe'), 'gamehub');
    this.connectionService.createHubConnection(hub).then(x => this.hub = x);
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
        this.hub.connection
          .invoke('GameOver', groupName, winningTileId, winningLine);
      }
    });
  }

  onTileChange(method: (...args: any[]) => void) {
    this.hub.connection.on('TileChange', method);
  }

  onSwitchTurn(method: (...args: any[]) => void) {
    this.hub.connection.on('SwitchTurn', method);
  }

  reset() {
    this._turnSubject.next(false);
  }
}
