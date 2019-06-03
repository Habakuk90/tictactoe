import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../../shared/models/user.registration.inteface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  errors: Array<string> = [];
  anonymousUser = false;

  constructor(private userService: UserService, private router: Router) { }
  login({ value, valid }: {value: UserRegistration, valid: Boolean}) {
    if (this.anonymousUser) {
      this.userService.currentUserName = value.userName;
      this.userService._isLoggedInSubject.next(true);

      // fixme: required out of input if anonymous
      valid = true;
    }

    if (valid) {
      this.userService.login(value.userName, value.password, this.anonymousUser)
        // .finally(() => this.isRequesting = false)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['']);
            this.userService.currentUserName = value.userName;
          }
        },
        error => this.errors = error);
    }
  }
}
