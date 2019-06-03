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

    userService._isLoggedInSubject.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      this.userName = userService.currentUserName;
    });
   }
}

