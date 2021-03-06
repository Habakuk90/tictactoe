import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

   canActivate() {

    const hasUserName = this.userService.currentUserName.trim().length > 0;

    const isLoggedIn = !!localStorage.getItem('auth_token');

    if (isLoggedIn) {
      this.userService.getUserName().toPromise().then(name => {
        this.userService.currentUserName = name;
        this.userService.isAnonymous = false;
      });
    }

    if (!isLoggedIn && !hasUserName) {
       this.router.navigate(['login']);
       return false;
    }

    return true;
  }
}
