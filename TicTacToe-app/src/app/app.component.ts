import { Component } from '@angular/core';
import { HubConnectionService } from './shared/services/hubconnection.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = '';
  constructor(connectionService: HubConnectionService, userService: UserService) {
    userService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        userService.getUserName().subscribe(res => this.userName =  res.toString());
        connectionService.startConnection();
      }
    });
   }
  }

