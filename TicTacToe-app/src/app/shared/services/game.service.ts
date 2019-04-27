import { Injectable } from '@angular/core';
import { ModalService } from '../modals/modal.service';
import { GameHubConnection } from '../connections/game.hubconnection';

@Injectable()
export class GameService {
  // homeState = this._HomeStateSubject.asObservable();
  hub: GameHubConnection;

  constructor(
    public modalService: ModalService) {
    // const hub = new GameHubConnection(
    //   connectionService.buildConnection('/tictactoe'),
    //   'gamehub'
    // );

    this.hub = new GameHubConnection(
      '/tictactoe', 'gamehub'
    );

    // this.connectionService._connectionBehaviour.next(false);
    // this.connectionService.createHubConnection(hub).then(x => {
    //   this.hub = x;
    //   this.connectionService._connectionBehaviour.next(true);
    // });
  }

  public startGame(groupName: string) {
    let promise: Promise<string>;

    this.hub.isConnected.subscribe(isConnected => {
      if (isConnected) {
        promise = this.hub.startGame(groupName);
      }
    });

    return promise;
  }
}
