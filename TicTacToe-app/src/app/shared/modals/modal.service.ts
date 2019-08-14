import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { IModal, Modal, Modals } from './modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeModal = new BehaviorSubject<Modal>(new Modal(Modals.empty, {}));

  constructor() {
  }

  openModal(modal: IModal) {
    this.activeModal.next(modal);
  }

  closeModal() {
    this.activeModal.next(new Modal(Modals.empty, {}));
  }
}
