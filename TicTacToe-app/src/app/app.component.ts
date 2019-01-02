import { Component, OnDestroy } from '@angular/core';
import { HubConnectionService } from './shared/services/hubconnection.service';
import { UserService } from './shared/services/user.service';
import { SpinnerService } from './spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  userName = '';
  constructor(private connectionService: HubConnectionService, userService: UserService, spinnerService: SpinnerService) {
    userService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        userService.getUserName().subscribe(res => this.userName =  res.toString(), err => userService.logout());
        spinnerService.toggleSpinner();
        connectionService.startConnection('/signalR').then(() => spinnerService.toggleSpinner());
      }
    });
   }

   ngOnDestroy() {
     this.connectionService.stopConnection();
   }
}

