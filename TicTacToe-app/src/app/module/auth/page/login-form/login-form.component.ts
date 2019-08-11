import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRegistration } from 'src/app/data/user.registration.inteface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  errors: Array<string> = [];

  public get anonymousUser(): boolean {
    return this.userService.isAnonymous;
  }

  public set anonymousUser(value: boolean) {
    this.userService.isAnonymous = value;
  }

  constructor(private userService: UserService, private router: Router) { }

  login({ value, valid }: {value: UserRegistration, valid: Boolean}) {
    if (valid) {
      this.userService.login(value.userName, value.password)
        .subscribe(result => {
          if (result) {
            this.anonymousUser = false;
            this.router.navigate(['']);
          }
        },
        error => this.errors = error);
    }
  }
}
