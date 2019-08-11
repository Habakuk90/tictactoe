import { Component, Output, EventEmitter } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent {
  @Output() gameSelected: EventEmitter<Array<IGame>> = new EventEmitter<Array<IGame>>();
  @Output() nextButton: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  games: Array<IGame> =
    [
      {name: 'TicTacToe', cssClass: 'ttt', selected: false, playerCount: 2},
      {name: 'RPS', cssClass: 'rps', selected: false, playerCount: 2}
    ];

  gameClicked(game: IGame) {
      this.games.filter((x: IGame) => x === game).map((x: IGame) => x.selected = !x.selected);
      this.gameSelected.emit(this.games);
    }

    nextStep() {
    this.nextButton.emit(1);
  }

  isGameSelected(): boolean {
    return this.games.filter(x => x.selected).length > 0;
  }
}
