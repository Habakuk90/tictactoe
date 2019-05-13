import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// TODOANDI still needed?
@Injectable()
export class GroupService {
  _groupNameSubject = new BehaviorSubject<string>('');
  groupName = this._groupNameSubject.asObservable();

  constructor() {

  }
}
