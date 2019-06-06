import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { IModal, Modal } from './modal';

@Injectable()
export class ModalService {
  activeModal = new BehaviorSubject<Modal>(new Modal('', {}));

  constructor() {
  }

  openModal(modal: IModal) {
    this.activeModal.next(modal);
  }

  closeModal() {
    this.activeModal.next(new Modal('', {}));
  }
}
