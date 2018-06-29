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
  currentUser;
  selectedPlayer;

  constructor(connectionService: HubConnectionService, userService: UserService) {

    this.currentUser = userService.getUserName().subscribe(res => {
      this.currentUser =  res.toString();
    });
    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('UpdateUserList', userOnline => this.userOnline = userOnline);
        this.connection.invoke('AddCurrentUser', userService.currentUserName);
        this.connection.on('ChallengeAccepted', enemy => {
          console.log('Game starting against ', enemy);
        });
      }
    });

  }

  challengeSelectedPlayer() {
    this.connection.invoke(
      'ChallengePlayer', this.currentUser, this.selectedPlayer);
  }
}
