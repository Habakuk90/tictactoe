import { Component, Input, OnDestroy, Query } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modals/modal.service';
import { SpinnerService } from '../spinner/spinner.service';
import { GroupService } from '../shared/services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  userOnline;
  currentUser: string;
  selectedPlayer: string;

  constructor(private connectionService: HubConnectionService, userService: UserService,
    private groupService: GroupService, private modalService: ModalService,
    private spinnerService: SpinnerService,
    private router: Router) {
      userService.getUserName().subscribe(res => {
        this.currentUser =  res.toString();
      }, err => userService.logout());

      connectionService.isConnected.subscribe(isConnected => {
        const that = this;
        if (isConnected) {
          this.connectionService.updateUserList(userOnline => {
            this.userOnline = userOnline;
          });

          this.connectionService.onStartGame((groupName, gameName) => {
            that.spinnerService.toggleSpinner();
            that.groupService.joinGroup(groupName).then(() => {
              that.router.navigate([gameName]);
              that.spinnerService.toggleSpinner();
              that.modalService.closeModal();
            });
          });

          this.connectionService.addCurrentUser(userService.currentUserName);
        }
      });
  }

  challengeSelectedPlayer() {
    this.connectionService.challengePlayer(this.selectedPlayer, 'tictactoe');
      this.selectedPlayer = '';
  }

  ngOnDestroy() {
    this.connectionService.connection.off('StartGame');
    this.connectionService.connection.off('UpdateUserList');
    this.connectionService.connection.off('SwitchTurn');
    this.connectionService.connection.off('JoinGroup');
  }
}
