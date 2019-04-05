import { Component, Output, EventEmitter } from '@angular/core';
import { IGame } from 'src/app/shared/models/game.interface';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent {
  @Output() gameSelected: EventEmitter<Array<IGame>> = new EventEmitter<Array<IGame>>();

  constructor(private gameService: GameService) {
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
    this.gameService._HomeStateSubject.next(1);
  }

  isGameSelected(): boolean {
    return this.games.filter(x => x.selected).length > 0;
  }
}
