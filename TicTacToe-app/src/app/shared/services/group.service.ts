import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/home/home.service';

@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor(private router: Router, private homeService: HomeService) {

  }

  // TODOANDI join Group über service/hubconnection implementieren
  joinGroup(groupName: string): Promise<void> {
    const that = this;

    let promise: Promise<void>;

    promise = this.homeService.hub.getConnection().invoke<void>('JoinGroup', groupName).then(() => {
      that._groupNameSubject.next(groupName);
      console.log(groupName);
    });

    return promise;
  }
  // TODOANDI join Group über service/hubconnection implementieren
  // leaveGroup(groupName: string) {
  //   const that = this;
  //   that._groupNameSubject.next('');

  //   this.connectionService.isConnected.subscribe(isConnected => {
  //     if (isConnected) {
  //       that.connectionService.hub.connection.invoke('LeaveGroup', groupName).then(() => {
  //         that.router.navigate(['/']);
  //       });
  //     }
  //   });
  // }
  leaveGroup(x: string): Promise<void> {
    throw new Error('Not Implemented');
  }

  // joinGroup(x: string): Promise<void> {
  //   throw new Error('not Implemented');
  // }
}
