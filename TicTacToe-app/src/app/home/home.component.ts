import { Component } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { HubConnection } from '@aspnet/signalr';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  connection: HubConnection;
  userOnline;
  currentUser: string;
  selectedPlayer: string;
  groupName: string;
  constructor(connectionService: HubConnectionService, userService: UserService) {

    userService.getUserName().subscribe(res => {
      this.currentUser =  res.toString();
    });
    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('UpdateUserList', userOnline => this.userOnline = userOnline);
        this.connection.invoke('AddCurrentUser', userService.currentUserName);
        this.connection.on('ChallengeAccepted', (enemy, groupName) => {
          this.groupName = groupName;

        });

        this.connection.on('UpdateGroup', (groupName) => {
          this.groupName = groupName;
        });
      }
    });

  }

  challengeSelectedPlayer() {
    this.connection.invoke(
      'ChallengePlayer', this.currentUser, this.selectedPlayer);
    this.groupName = this.currentUser + this.selectedPlayer;

    this.connection.invoke('JoinGroup', this.selectedPlayer, this.groupName);
  }
}
