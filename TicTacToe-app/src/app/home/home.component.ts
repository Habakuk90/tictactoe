import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from '../shared/models/game.interface';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { GroupService } from '../shared/services/group.service';
import { HubComponent } from '../shared/connections/base.hubconnection';
import { HomeHubConnection } from './home.hubconnection';
import { ModalService } from '../shared/modals/modal.service';
import { Modal, IModal, Modals } from '../shared/modals/modal';
import { HubService } from '../shared/connections/hub.service';

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

  hub: HomeHubConnection;

  constructor(private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private modalService: ModalService,
    private hubService: HubService) {

    this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);
    this.hub = this.hubService.createConnection('/signalR', 'homehub', HomeHubConnection);
  }

  selectedGame(game: IGame): IGame {
    return this.selectedGames.filter(x => x === game)[0];
  }

  ngOnInit() {
    const that = this;

    // TODOANDI test if observable username is necessary.
    this.userService.userName.subscribe((userName: string) => {
      if (userName.trim().length > 0) {
        that.hub.isConnected.subscribe((isConnected: boolean) => {
          if (isConnected) {
            that.hub.addCurrentUser(userName);
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
    this.hub.challengePlayer(this.selectedPlayer, 'tictactoe');
  }

  ngOnDestroy() {
    // TODOANDI homestate refactorn
    this.userService._HomeStateSubject.next(0);
    this.hubService.stopConnection(this.hub);
  }

  registerOnMethods() {
    const that = this;
    this.hub.onUpdateUserList(userOnline => {
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

      const name: Modals = Modals[modalName];
      const modal: IModal = new Modal(name, { enemyUserName: enemy });
      that.modalService.openModal(modal);
    });
  }
}
