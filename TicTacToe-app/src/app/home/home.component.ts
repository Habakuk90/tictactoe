import { Component, OnDestroy } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  isGameSelected = false;
  isPlayerSelected = false;
  selectionState = 0;
  selectedGames: Array<IGame>;
  selectedPlayer: string;

  constructor(private userService: UserService) {
    this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);

  }

  gameSelected(games: Array<IGame>) {
    this.selectedGames = games;
    this.isGameSelected = this.selectedGames.length > 0;
  }

  enemySelected(enemy: string) {
    this.selectedPlayer = enemy;
    this.isPlayerSelected = enemy != null;
    this.userService._HomeStateSubject.next(2);
    this.selectionState = 2;
  }

  back() {
    this.selectionState = this.selectionState > 0 ? --this.selectionState : 0;
    this.isGameSelected = false;
    this.isPlayerSelected = false;
  }

  challengeSelectedPlayer() {
    // todoandi
    // this.userService.startGame('tictactoe').catch(e => console.log(e));
    this.userService.hub.hub.challengePlayer(this.selectedPlayer, 'tictactoe');
  }

  ngOnDestroy() {
    this.userService._HomeStateSubject.next(0);
  }
}
