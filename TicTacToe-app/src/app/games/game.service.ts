
import { Injectable } from '@angular/core';
import { GameHubConnection } from './game.hubconnection';

enum GameConnMethods {
  GameOver = 'GameOver'
}

@Injectable()
export class GameService {
  hub: GameHubConnection;

  constructor() {
    this.hub = new GameHubConnection('/tictactoe', 'gamehub');
  }

  public onGameOver(method: (...args: any[]) => void) {
    this.hub.getConnection().on(GameConnMethods.GameOver, method);
  }

  public gameOver(...args: any[]) {
    return this.hub.getConnection().invoke(GameConnMethods.GameOver, ...args);
  }
}
