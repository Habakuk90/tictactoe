import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnectionService } from './hubconnection.service';
import { Router } from '@angular/router';

@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor(private connectionService: HubConnectionService,
     private router: Router) {

  }
  JoinGroup(groupName, roomRoute) {
    const that = this;
    this.connectionService.connection.invoke('JoinGroup', groupName).then(() => {
      that._groupNameSubject.next(groupName);
      that.router.navigate([roomRoute]);

    });
  }
}
