import { Component } from '@angular/core';
import { HubConnectionService } from './shared/services/hubconnection.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isConnected = false;
  userName = '';
  constructor(connectionService: HubConnectionService, userService: UserService) {
    connectionService.startConnection().then(() => this.isConnected = true);
    userService.getUserName().subscribe(res => this.userName =  res.toString());
  }
}
