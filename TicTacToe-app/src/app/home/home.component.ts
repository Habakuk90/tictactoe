import { Component, OnInit } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { HubConnection } from '@aspnet/signalr';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  connection: HubConnection;
  message: string;
  userOnline;
  currentUser;
  constructor(connectionService: HubConnectionService, userService: UserService) {
    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('SendAll', (res) => {
          this.message = res;
        });
        this.connection.on('UpdateUserList', userOnline => {this.userOnline = userOnline;} );
        this.currentUser = userService.currentUserName;
        this.connection.invoke('AddCurrentUser', userService.currentUserName);
        this.connection.invoke('GetAllUser')
          .then(userOnline => { this.userOnline = userOnline; });
      }
    });

    connectionService.startConnection();
  }

  ngOnInit() {

  }

  hello(message) {
    this.connection.invoke('SendAll', message.value);
  }
}
