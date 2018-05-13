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
  constructor(private userService: UserService, private router: Router) { }
  login({ value, valid }: {value: UserRegistration, valid: Boolean}) {
    // this.submitted = true;
    // this.isRequesting = true;
    // this.errors='';
    if (valid) {
      this.userService.login(value.userName, value.password)
        // .finally(() => this.isRequesting = false)
        .subscribe(
        result => {
          if (result) {
            localStorage.setItem('auth_token', result);
            this.router.navigate(['']);
          }
        });
        // , error => this.errors = error);
    }
  }
}
