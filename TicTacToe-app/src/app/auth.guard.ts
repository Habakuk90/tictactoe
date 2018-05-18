// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

   canActivate() {
    const isLoggedIn = !!localStorage.getItem('auth_token');

    if (!isLoggedIn) {
       this.router.navigate(['login']);
       return false;
    }

    return true;
  }
}
