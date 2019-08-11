import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './page/login-form/login-form.component';
import { RegistrationFormComponent } from './page/registration-form/registration-form.component';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthRoutingModule } from './account.routing';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule, FormsModule, AuthRoutingModule, SharedModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent],
  providers:    [ UserService ]
})
export class AccountModule { }
