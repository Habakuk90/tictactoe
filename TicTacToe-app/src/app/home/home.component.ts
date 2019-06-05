import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { UserService } from '../shared/services/user.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { GroupService } from '../shared/services/group.service';
import { HubComponent } from '../shared/connections/base.hubconnection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
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
    const that = this;

    // TODOANDI test if observable username is necessary.
    this.userService.userName.subscribe((userName: string) => {
      if (userName.trim().length > 0) {
        that.homeService.hub.isConnected.subscribe((isConnected: boolean) => {
          if (isConnected) {
           that.homeService.hub.addCurrentUser(userName);
          }
        });
      }
    });

    that.registerOnMethods();
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
    this.homeService.challengePlayer(this.selectedPlayer, 'tictactoe');
  }

  ngOnDestroy() {
    // TODOANDI homestate refactorn
    this.userService._HomeStateSubject.next(0);
  }

  registerOnMethods() {
    const that = this;
    this.homeService.onUpdateUserList(userOnline => {
        that.userService.userOnline = userOnline;
    });

    this.homeService.onStartGame((groupName: string, gameName: string) => {
      that.groupService._groupNameSubject.next(groupName);
      that.router.navigate(['/' + gameName]);
    });
  }
}
