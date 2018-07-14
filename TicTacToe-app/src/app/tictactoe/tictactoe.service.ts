import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupService } from '../shared/services/group.service';
import { Router } from '../../../node_modules/@angular/router';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class TicTacToeService extends GroupService {
  // Group Service?
  private _turnSubject = new BehaviorSubject<boolean>(false);
  isTurn = this._turnSubject.asObservable();

  constructor(connectionService: HubConnectionService,
      router: Router, spinnerService: SpinnerService) {
    super(connectionService, router, spinnerService);
  }

  switchTurn() {
    this._turnSubject.next(!this._turnSubject.value);
  }

  reset() {
    this._turnSubject.next(false);
    this._groupNameSubject.next('');
  }
}
