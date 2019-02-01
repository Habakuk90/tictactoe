import { Component } from '@angular/core';
import { IGame } from '../shared/models/game.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isGameSelected: boolean = false;
  selectedGame: IGame;
  gameSelected(game: IGame) {
    this.selectedGame = game;
    console.log(game);
    this.isGameSelected = game != null;
  }
}
