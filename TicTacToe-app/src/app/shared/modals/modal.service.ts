import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';

@Injectable()
export class ModalService {
  activeModal = new BehaviorSubject<string>('');
  modalArgs = new BehaviorSubject<object>({});

  constructor() {
  }

  openModal(modalName: string, args: object) {
    this.activeModal.next(modalName);
    this.modalArgs.next(args);
  }

  closeModal() {
    this.activeModal.next('');
  }
}
