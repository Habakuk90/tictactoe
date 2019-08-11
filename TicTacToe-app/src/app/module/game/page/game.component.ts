import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';
import { IUser } from 'src/app/data/user.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  selectedGames: Array<IGame>;
  isGameSelected = false;
  constructor(private router: Router) {
  }

  selectedGame(game: IGame): IGame {
    return this.selectedGames.filter(x => x === game)[0];
  }

  // public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    const that = this;

    // that.hub.isConnected.subscribe((isConnected: boolean) => {
    //   if (isConnected) {
    //     that.hub.addCurrentUser(that.userService.currentUserName, that.userService.isAnonymous);
    //     that.registerOnMethods();
    //   }
    // });
  }

  onGameSelected(games: IGame) {
    this.isGameSelected = true;
    this.router.navigate([this.router.url, games.name]);
  }

  nextStep(step: number) {
  }

  enemySelected(enemy: IUser) {
  }

  back() {
  }

  challengeSelectedPlayer() {
  }

  ngOnDestroy() {
  }

  registerOnMethods() {

    }
}
