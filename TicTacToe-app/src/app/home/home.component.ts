import { Component } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { IUser } from '../shared/models/user.interface';
import { HubConnectionService } from '../shared/services/hubconnection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isGameSelected: boolean = false;
  isPlayerSelected: boolean = false;
  selectedGame: IGame;
  selectedPlayer: string;

  constructor(public connectionService: HubConnectionService) {

  }

  gameSelected(game: IGame) {
    this.selectedGame = game;
    this.isGameSelected = game != null;
  }

  enemySelected(enemy: string) {
    this.selectedPlayer = enemy;
    this.isPlayerSelected = enemy != null;
  }

  challengeSelectedPlayer() {
    this.connectionService.challengePlayer(this.selectedPlayer, 'tictactoe');
      this.selectedPlayer = '';
  }
}
