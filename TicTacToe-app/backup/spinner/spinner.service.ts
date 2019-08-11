import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SpinnerService {
  _spinnerSubject = new BehaviorSubject<boolean>(false);
  showSpinner = this._spinnerSubject.asObservable();

  toggleSpinner() {
    this._spinnerSubject.next(!this._spinnerSubject.value);
  }
}
