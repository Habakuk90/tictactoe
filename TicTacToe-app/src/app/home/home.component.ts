import { Component } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { IUser } from '../shared/models/user.interface';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isGameSelected = false;
  isPlayerSelected = false;
  selectionState = 0;
  selectedGames: Array<IGame>;
  selectedPlayer: string;

  constructor(private gameService: GameService, public connectionService: HubConnectionService) {
    gameService._HomeStateSubject.subscribe(x => this.selectionState = x);

  }

  gameSelected(games: Array<IGame>) {
    this.selectedGames = games;
    this.isGameSelected = this.selectedGames.length > 0;
  }

  enemySelected(enemy: string) {
    this.selectedPlayer = enemy;
    this.isPlayerSelected = enemy != null;
    this.gameService._HomeStateSubject.next(2);
  }

  back() {
    this.selectionState = this.selectionState > 0 ? --this.selectionState : 0;
    this.isGameSelected = false;
    this.isPlayerSelected = false;
  }

  challengeSelectedPlayer() {
    this.connectionService.challengePlayer(this.selectedPlayer, 'tictactoe');
      this.selectedPlayer = '';
  }
}
