import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from '../../shared/models/user.registration.inteface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  constructor(private userService: UserService, private router: Router) { }

  errors;

  register({value, valid}: {value: UserRegistration, valid: boolean}) {
    if (valid) {
      this.userService.register(value.userName, value.password, value.confirmPassword)
        // .finally(() => this.isRequesting = false)
        .subscribe(
        (result) => {
            this.router.navigate(['']);
        },
        error => {
          this.errors = error;
        });
    }
  }
}
