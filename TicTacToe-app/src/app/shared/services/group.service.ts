import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from './hubconnection.service';
import { Router } from '@angular/router';
import { UserHubConnection } from '../connections/user.hubconnection';

@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor(public connectionService: HubConnectionService<UserHubConnection>,
     private router: Router) {

  }

  joinGroup(groupName: string): Promise<void> {
    const that = this;

    let promise: Promise<void>;

    promise = this.connectionService.hub.connection.invoke<void>('JoinGroup', groupName).then(() => {
      that._groupNameSubject.next(groupName);
      console.log(groupName);
    });

    return promise;
  }

  leaveGroup(groupName: string) {
    const that = this;
    that._groupNameSubject.next('');

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        that.connectionService.hub.connection.invoke('LeaveGroup', groupName).then(() => {
          that.router.navigate(['/']);
        });
      }
    });
  }
}
