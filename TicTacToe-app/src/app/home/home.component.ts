import { Component, Input, OnDestroy, Query } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { HubConnection } from '@aspnet/signalr';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modals/modal.service';
import { GameService } from '../shared/services/game.service';
import { SpinnerService } from '../spinner/spinner.service';
import { GroupService } from '../shared/services/group.service';
import { TicTacToeService } from '../tictactoe/tictactoe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  connection: HubConnection;
  userOnline;
  currentUser: string;
  selectedPlayer: string;

  constructor(connectionService: HubConnectionService, userService: UserService,
    private groupService: GroupService, private modalService: ModalService,
    private gameService: GameService,
    private tictactoeService: TicTacToeService,
    private spinnerService: SpinnerService,
    private router: Router) {
      userService.getUserName().subscribe(res => {
        this.currentUser =  res.toString();
      });

      connectionService.isConnected.subscribe(isConnected => {
        const that = this;
        if (isConnected) {
          this.connection = connectionService.connection;
          this.connection.on('UpdateUserList', userOnline =>
            this.userOnline = userOnline);

          this.connection.on('StartGame', (groupName, gameName) => {
            that.spinnerService.toggleSpinner();
            that.groupService.JoinGroup(groupName).then(() => {
              that.router.navigate([gameName]);
              that.spinnerService.toggleSpinner();
              that.modalService.closeModal();
            });
          });

          this.connection.invoke('AddCurrentUser', userService.currentUserName);
        }
      });
  }

  challengeSelectedPlayer() {
    this.connection.invoke(
      'ChallengePlayer', this.selectedPlayer, 'tictactoe');
      this.selectedPlayer = '';
  }

  ngOnDestroy() {
    this.connection.off('StartGame');
    this.connection.off('UpdateUserList');
    this.connection.off('SwitchTurn');
    this.connection.off('JoinGroup');
  }
}
