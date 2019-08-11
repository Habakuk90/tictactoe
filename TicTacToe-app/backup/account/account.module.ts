import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { UserService } from '../shared/services/user.service';


import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { routing } from './account.routing';


@NgModule({
  imports: [
    CommonModule, FormsModule, routing, SharedModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent],
  providers:    [ UserService ]
})
export class AccountModule { }
