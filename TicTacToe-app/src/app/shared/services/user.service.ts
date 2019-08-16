import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl: String = '';

  _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');

  isAnonymous = true;
  userOnline = [];

  public get currentUserName() {
    return this.userName.value;
  }

  public set currentUserName(value: string) {
    this.userName.next(value);
  }

  constructor(private http: HttpClient, private router: Router) {
    super();
    this._isLoggedInSubject.next(!!localStorage.getItem('auth_token'));
    this.baseUrl = environment.signalR.baseUrl;
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

  login(userName: string, password: string = '') {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.userExists(userName).pipe(switchMap((userExists: boolean) => {
      this.currentUserName = userName;
      this.userName.next(userName);

      if (userExists && this.isAnonymous) {
        return throwError(['User name is already taken, choose a different one.']);
      } else if (this.isAnonymous) {
        this.router.navigate(['']);
        this._isLoggedInSubject.next(true);

        return new Observable(null);
      } else {
        if (password && password.trim().length <= 0 && !this.isAnonymous) {
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
    this.isAnonymous = true;
    this.router.navigate(['login']);
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
    ).pipe(map(res => {
      this.userName.next(res.toString());
      return res.toString();
    }
    ));
  }

  userExists(userName: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get(`${this.baseUrl}/admin/UserExists?name=${userName}`);
  }
}
