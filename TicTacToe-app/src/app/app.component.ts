import { Component, OnDestroy } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  userName = '';
  constructor(userService: UserService) {

    userService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        userService.getUserName().subscribe(res => {
          this.userName = res.toString();
        }, err => {
          userService.logout();
          console.log(err);
        });
      }
    });
   }

   ngOnDestroy() {
    //  this.connectionService.stopConnection();
   }
}

