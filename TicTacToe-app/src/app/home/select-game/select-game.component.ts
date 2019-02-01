import { Component, Output, EventEmitter } from '@angular/core';
import { IGame } from 'src/app/shared/models/game.interface';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html'
  // styleUrls: ['./home.component.scss']
})
export class SelectGameComponent {
  @Output() gameSelected: EventEmitter<IGame> = new EventEmitter<IGame>();

  games: Array<IGame> = [{name: 'TicTacToe'}, {name: 'RPS'}];
  selectedGame: IGame;

  gameClicked(game: IGame) {

    if (this.selectedGame === game) {
      this.selectedGame = null;
      game = null;
    } else {
      this.selectedGame = game;
    }
    this.gameSelected.emit(game);
  }
}
