import { Component, OnDestroy } from '@angular/core';
import { HubConnectionService } from './shared/services/hubconnection.service';
import { UserService } from './shared/services/user.service';
import { UserHubConnection } from './shared/connections/user.hubconnection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  userName = '';
  constructor(
    private connectionService: HubConnectionService<UserHubConnection>,
    userService: UserService) {

    userService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        userService.getUserName().subscribe(res => this.userName =  res.toString(), err => userService.logout());
      }
    });
   }

   ngOnDestroy() {
     this.connectionService.stopConnection();
   }
}

