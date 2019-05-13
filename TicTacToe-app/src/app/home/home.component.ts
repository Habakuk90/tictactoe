import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { UserService } from '../shared/services/user.service';
import { HomeService } from './home.service';
import { stringify } from '@angular/core/src/render3/util';
import { Router } from '@angular/router';
import { GroupService } from '../shared/services/group.service';

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

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private homeService: HomeService) {
    this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);
  }

  ngOnInit() {
    var that = this;
    /// TODOANDI waaaay too much || is there a equivalent to vuex store and automated watching.
    // TODOANDI do not use .hub.
    this.userService.userName.subscribe((userName: string) => {
      if (userName.trim().length > 0) {
        this.homeService.hub.isConnected.subscribe((isConnected: boolean) => {
          if (isConnected) {
           this.homeService.hub.addCurrentUser(userName);
          }
        });

      }
    });

    this.homeService.onUpdateUserList(userOnline => {
        this.userService.userOnline = userOnline;
    });

    this.homeService.onStartGame((groupName: string, gameName: string) => {
      that.groupService._groupNameSubject.next(groupName);
      this.router.navigate(['/' + gameName]);
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
    this.homeService.challengePlayer(this.selectedPlayer, 'tictactoe');
  }

  ngOnDestroy() {
    this.userService._HomeStateSubject.next(0);
  }
}
