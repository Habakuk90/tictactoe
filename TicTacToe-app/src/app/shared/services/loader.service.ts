import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader = false;
  showLoaderSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.showLoader = true;
    this.showLoaderSubject.next(true);
  }

  hide() {
    this.showLoader = false;
    this.showLoaderSubject.next(false);
  }
}
