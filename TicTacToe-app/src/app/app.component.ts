import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  userName = '';
  isLoggedIn = false;
  constructor(userService: UserService) {

    userService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
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
}

