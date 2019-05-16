
import { Injectable } from '@angular/core';
import { GameHubConnection } from './game.hubconnection';

@Injectable()
export class GameService {
  hub: GameHubConnection;

  constructor() {
    this.hub = new GameHubConnection('/tictactoe', 'gamehub');
  }

  public onGameOver(method: (...args: any[]) => void) {
    this.hub.getConnection().on('GameOver', method);
  }

  public gameOver(...args: any[]) {
    return this.hub.getConnection().invoke('GameOver', ...args);
  }
}
