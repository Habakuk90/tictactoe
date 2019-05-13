
import { Injectable } from '@angular/core';
import { GameHubConnection } from './game.hubconnection';

@Injectable()
export class GameService {
  hub: GameHubConnection;

  constructor() {
    this.hub = new GameHubConnection('/tictactoe', 'gamehub');
  }
}
