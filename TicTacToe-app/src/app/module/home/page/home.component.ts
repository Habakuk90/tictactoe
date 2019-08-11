import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';
import { IUser } from 'src/app/data/user.interface';
import { HomeHubConnection } from '../home.hubconnection';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/services/group.service';
import { UserService } from 'src/app/shared/services/user.service';
import { HubService } from 'src/app/connections/hub.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';

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
  selectedPlayer: IUser;

  hub: HomeHubConnection;

  constructor(private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    // private modalService: ModalService,
    private hubService: HubService) {

    this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);
    this.hub = this.hubService.createConnection('/signalR', 'homehub', HomeHubConnection);
  }

  selectedGame(game: IGame): IGame {
    return this.selectedGames.filter(x => x === game)[0];
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    const that = this;

    that.hub.isConnected.subscribe((isConnected: boolean) => {
      if (isConnected) {
        that.hub.addCurrentUser(that.userService.currentUserName, that.userService.isAnonymous);
        that.registerOnMethods();
      }
    });
  }

  gameSelected(games: Array<IGame>) {
    this.selectedGames = games;
    this.isGameSelected = this.selectedGames.length > 0;
  }

  nextStep(step: number) {
    this.userService._HomeStateSubject.next(step);
  }

  enemySelected(enemy: IUser) {
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
    this.hub.challengePlayer(this.selectedPlayer.name, 'tictactoe');
  }

  ngOnDestroy() {
    // TODOANDI homestate refactorn
    this.userService._HomeStateSubject.next(0);
    // FIXME will the conneciton be stabel at all times, maybe yes because of chat and other functionality
    // evaluate if more socketuris are an option.
    // this.hub.stopConnection();
  }

  registerOnMethods() {
    const that = this;
    this.hub.onUpdateUserList((userOnline: Array<IUser>) => {
      that.userService.userOnline = userOnline;
    });

    this.hub.onStartGame((groupName: string, gameName: string) => {
      that.groupService._groupNameSubject.next(groupName);
      that.router.navigate(['/' + gameName]);
    });

    this.hub.onOpenModal((enemy: string, gameName: string, modalName: string) => {
      if (that.selectedGames) {
        that.selectedGames.find(x => x.name.toLowerCase() === gameName.toLowerCase()).selected = true;
      }

      // const name: Modals = Modals[modalName];
      // const modal: IModal = new Modal(name, { enemyUserName: enemy });
      // that.modalService.openModal(modal);
    });
  }
}
