import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';


@Injectable()
export class ModalService {
  activeModal = new BehaviorSubject<string>('');

  constructor() {
  }

  openModal(modalName: string) {
    this.activeModal.next(modalName);
  }

  closeModal() {
    this.activeModal.next('');
  }
}
