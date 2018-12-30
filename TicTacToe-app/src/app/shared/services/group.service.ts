import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from './hubconnection.service';
import { Router } from '@angular/router';

@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor(public connectionService: HubConnectionService,
     private router: Router) {

  }
  JoinGroup(groupName: string): Promise<void> {
    const that = this;

    let promise: Promise<void>;
    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        promise = this.connectionService.connection.invoke<void>('JoinGroup', groupName).then((a) => {
          that._groupNameSubject.next(groupName);
          console.log('group');
        });
      }
    });

    return promise;
  }

  LeaveGroup(groupName: string) {
    const that = this;
    that._groupNameSubject.next('');

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        that.connectionService.connection.invoke('LeaveGroup', groupName).then(() => {
          that.router.navigate(['/']);
        });
      }
    });
  }
}
