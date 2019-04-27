import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { UserService } from '../shared/services/user.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isGameSelected = false;
  isPlayerSelected = false;
  selectionState = 0;
  selectedGames: Array<IGame>;
  selectedPlayer: string;

  constructor(private userService: UserService, private homeService: HomeService) {
    this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);
  }

  ngOnInit() {
    this.userService.userName.subscribe(x => {
      this.homeService.hub.addCurrentUser(x);
    });

    this.homeService.hub.onUpdateUserList(userOnline => {
        this.userService.userOnline = userOnline;
    });
  }

  gameSelected(games: Array<IGame>) {
    this.selectedGames = games;
    this.isGameSelected = this.selectedGames.length > 0;
  }

  nextStep(step: number) {
    this.userService._HomeStateSubject.next(step);
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
    // this.homeService.hub.startGame('tictactoe').catch(e => console.log(e));
    this.homeService.hub.challengePlayer(this.selectedPlayer, 'tictactoe');
  }

  ngOnDestroy() {
    this.userService._HomeStateSubject.next(0);
  }
}
