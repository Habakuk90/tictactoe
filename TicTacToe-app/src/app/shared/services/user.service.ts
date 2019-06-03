import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Add the RxJS Observable operators we need in this app.
// import '../../rxjs-operators';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService {
  baseUrl: String = '';

  _isLoggedInSubject = new BehaviorSubject<boolean>(false);

  userName = new BehaviorSubject<string>('');
  currentUserName = '';
  userOnline = [];

  constructor(private http: HttpClient, private router: Router,
    configService: ConfigService) {
    super();
    this._isLoggedInSubject.next(!!localStorage.getItem('auth_token'));
    this.baseUrl = configService._apiURI;
  }

  register(userName: string, password: string, confirmPassword: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.baseUrl + '/Account/RegisterUser',
      JSON.stringify({ userName, password, confirmPassword }),
      { headers: headers, responseType: 'text' }
    )
      .pipe(
        map(res => {
          localStorage.setItem('auth_token', res);
          this._isLoggedInSubject.next(true);

          return res;
        }),
        catchError(this.handleError)
      );
  }

  login(userName: string, password: string = '', isAnonymous: boolean = false) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.userExists(userName).pipe(switchMap((userExists: boolean) => {
      if (userExists) {
        return throwError(['User name is already taken, choose a different one.']);
      } else if (isAnonymous) {
        this.currentUserName = userName;
        this.userName.next(userName);
        this.router.navigate(['']);

        return new Observable(null);
      } else {
        if (password && password.trim().length <= 0 && !isAnonymous) {
          return new Observable(null);
        }

        return this.http.post(
          this.baseUrl + '/Account/LoginUser',
          JSON.stringify({ userName, password }),
          { headers: headers, responseType: 'text' }
        )
          .pipe(
            map(res => {
              localStorage.setItem('auth_token', res);
              this._isLoggedInSubject.next(true);

              return res;
            }),
            catchError(this.handleError));
      }
    }));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._isLoggedInSubject.next(false);
    this.router.navigate(['login']);
    // this.connectionService.stopConnection();
  }

  getUserName() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth_token');

    if (!authToken) { this.logout(); }

    headers = headers.set('Authorization', `Bearer ${authToken}`);

    return this.http.get(
      this.baseUrl + '/values/getUserName',
      { headers: headers }
    ).pipe(map(res => res), map(res => {
      this.userName.next(res.toString());
      return this.currentUserName = res.toString()
    }
    ));
  }

  userExists(userName: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/admin/UserExists?name=${userName}`);
  }
}
