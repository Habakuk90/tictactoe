import {Component, Input, OnDestroy, Output, EventEmitter, OnInit} from '@angular/core';
import { HubConnectionService } from 'src/app/shared/services/hubconnection.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IGame } from 'src/app/shared/models/game.interface';
import { UserHubConnection } from 'src/app/shared/connections/user.hubconnection';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss']
})

export class SelectPlayerComponent implements OnDestroy, OnInit {
  @Output() playerSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedGames: Array<IGame>;
  userOnline: Array<string>;
  currentUser: string;
  selectedPlayer: string;

  constructor(private connectionService: HubConnectionService<UserHubConnection>, userService: UserService) {
      userService.getUserName().subscribe(res => {
        this.currentUser =  res.toString();
      }, err => userService.logout());

      const connectionMethods = userService.hub;
      connectionService.isConnected.subscribe(isConnected => {
        if (isConnected) {
          connectionMethods.hub.updateUserList(userOnline => {
            this.userOnline = userOnline;
          });

        }
      });

      // this.connectionService.onStartGame((groupName, gameName) => {
      //   const that = this;

      //   that.spinnerService.toggleSpinner();
      //   that.groupService.joinGroup(groupName).then(() => {
      //     that.router.navigate([gameName]);
      //     that.spinnerService.toggleSpinner();
      //     that.modalService.closeModal();
      //   });
      // });

      connectionMethods.hub.addCurrentUser(userService.currentUserName);
  }

  enemyClicked(user: string) {
    if (this.selectedPlayer === user) {
      this.selectedPlayer = null;
      user = null;
    } else {
      this.selectedPlayer = user;
    }
    this.playerSelected.emit(user);
  }

  ngOnInit() {
    this.selectedGames = this.selectedGames.filter(x => x.selected);
  }

  ngOnDestroy() {
    this.connectionService.hub.connection.off('StartGame');
    this.connectionService.hub.connection.off('UpdateUserList');
    // this.connectionService.connection.off('SwitchTurn');
    this.connectionService.hub.connection.off('JoinGroup');
  }
}
