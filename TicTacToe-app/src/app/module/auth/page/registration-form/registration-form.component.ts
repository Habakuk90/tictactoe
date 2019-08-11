import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UserRegistration } from 'src/app/data/user.registration.inteface';

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
