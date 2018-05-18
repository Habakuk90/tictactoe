import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Add the RxJS Observable operators we need in this app.
// import '../../rxjs-operators';
import { ConfigService } from '../utils/config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserRegistration } from '../models/user.registration.inteface';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  baseUrl: String = '';

  private loggedIn = false;

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  constructor(private http: HttpClient, configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this.baseUrl = configService.getApiURI();
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(userName: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.baseUrl + '/Account/RegisterUser',
        JSON.stringify({ userName, password }),
        {headers: headers, responseType: 'text'}
      )
      .pipe(
        map(res => res),
        map(res => {
          localStorage.setItem('auth_token', res);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
        }),
        catchError(this.handleError)
      );
  }

  login(userName, password) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(
        this.baseUrl + '/Account/LoginUser',
        JSON.stringify({ userName, password }),
        { headers: headers, responseType: 'text' }
      )
      .pipe(
        map(res => res),
        map(res =>  {
          localStorage.setItem('auth_token', res);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);

          return res;
       }),
        catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserName() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth_token');
    headers = headers.set('Authorization', `Bearer ${authToken}`);

    return this.http.get(
      this.baseUrl + '/values/getUserName',
      {headers: headers}
    ).pipe(map(res => res));
  }
}
