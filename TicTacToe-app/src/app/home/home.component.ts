import { Component, Input, OnDestroy } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { HubConnection } from '@aspnet/signalr';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
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
  // groupName: string;
  constructor(connectionService: HubConnectionService, userService: UserService,
    private tictactoeService: TicTacToeService) {

    userService.getUserName().subscribe(res => {
      this.currentUser =  res.toString();
    });
    connectionService.isConnected.subscribe(isConnected => {
      const that = this;
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('UpdateUserList', userOnline => this.userOnline = userOnline);
        this.connection.invoke('AddCurrentUser', userService.currentUserName);
        this.connection.on('ChallengeAccepted', (groupName, isTurn) => {
          that.tictactoeService.JoinGroup(groupName, 'tictactoe');
          if (isTurn) { that.tictactoeService.switchTurn(); }
        });
        this.connection.on('ChallengeDeclined', (enemyUserName) => {
          console.log(enemyUserName + 'has declined');


        });
      }
    });

  }

  challengeSelectedPlayer() {
    this.connection.invoke(
      'ChallengePlayer', this.selectedPlayer);
  }

  ngOnDestroy() {
    this.connection.off('ChallengeAccepted');
    this.connection.off('UpdateUserList');
  }
}
