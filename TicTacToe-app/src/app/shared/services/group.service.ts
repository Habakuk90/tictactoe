import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from './hubconnection.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../spinner/spinner.service';

@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor(private connectionService: HubConnectionService,
     private router: Router, private spinnerService: SpinnerService) {

  }
  JoinGroup(groupName, roomRoute) {
    const that = this;
    this.spinnerService.toggleSpinner();
    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connectionService.connection.invoke('JoinGroup', groupName).then(() => {
          that._groupNameSubject.next(groupName);
          that.router.navigate([roomRoute]);
          that.connectionService.connection.invoke('UpdateUserList');
          that.spinnerService.toggleSpinner();
        });
      }
    });
  }

  LeaveGroup(groupName) {
    const that = this;
    that.spinnerService.toggleSpinner();
    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        that.connectionService.connection.invoke('LeaveGroup', groupName).then(() => {
          that._groupNameSubject.next('');
          that.router.navigate(['/']);
          that.spinnerService.toggleSpinner();
        });
      }
    });
  }
}
