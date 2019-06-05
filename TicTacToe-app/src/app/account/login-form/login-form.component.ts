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
  // anonymousUser = false;

  public get anonymousUser(): boolean {
    return this.userService.isAnonymous;
  }

  public set anonymousUser(value: boolean) {
    this.userService.isAnonymous = value;
  }

  constructor(private userService: UserService, private router: Router) { }

  login({ value, valid }: {value: UserRegistration, valid: Boolean}) {
    if (this.anonymousUser) {
      // fixme: required out of input if anonymous
      valid = true;
    }

    if (valid) {
      this.userService.login(value.userName, value.password, this.anonymousUser)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['']);
          }
        },
        error => this.errors = error);
    }
  }
}
