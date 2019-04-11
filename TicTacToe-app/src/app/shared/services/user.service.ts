import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Add the RxJS Observable operators we need in this app.
// import '../../rxjs-operators';
import { ConfigService } from '../utils/config.service';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HubConnectionService } from './hubconnection.service';
import { UserHubConnection } from '../connections/user.hubconnection';
import { Hub } from '../connections/base.hubconnection';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Injectable()
export class UserService extends BaseService {
  baseUrl: String = '';

  private _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedInSubject.asObservable();

  currentUserName = '';

  hub: Hub<UserHubConnection>;

  constructor(private http: HttpClient, private router: Router,
              configService: ConfigService,
              private connectionService: HubConnectionService<UserHubConnection>,
              spinnerService: SpinnerService) {
    super();
    this._isLoggedInSubject.next(!!localStorage.getItem('auth_token'));
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this.baseUrl = configService._apiURI;
    spinnerService.toggleSpinner();
    this.getUserName().subscribe(x => this.currentUserName = x);
    const hub = new UserHubConnection(connectionService.buildConnection('/signalR'), 'userhub');

    connectionService.createHubConnection(hub)
      .then((x) => {
        spinnerService.toggleSpinner();
        this.hub = x;
        this.connectionService._connectionBehaviour.next(true);
      })
      .catch(() => window.location.href = window.location.host);
  }

  register(userName: string, password: string, confirmPassword: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.baseUrl + '/Account/RegisterUser',
        JSON.stringify({ userName, password, confirmPassword }),
        {headers: headers, responseType: 'text'}
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

  login(userName: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(
        this.baseUrl + '/Account/LoginUser',
        JSON.stringify({ userName, password }),
        { headers: headers, responseType: 'text' }
      )
      .pipe(
        map(res =>  {
          localStorage.setItem('auth_token', res);
          this._isLoggedInSubject.next(true);

          return res;
       }),
        catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._isLoggedInSubject.next(false);
    this.router.navigate(['login']);
    this.connectionService.stopConnection();
  }

  getUserName() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth_token');
    headers = headers.set('Authorization', `Bearer ${authToken}`);

    return this.http.get(
      this.baseUrl + '/values/getUserName',
      {headers: headers}
    ).pipe(map(res => res), map(res => this.currentUserName = res.toString()));
  }

  public startGame(groupName: string) {
    let promise: Promise<string>;

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        promise = this.hub.connection.invoke('StartGame', groupName);
      }
    });

    return promise;
  }
}
