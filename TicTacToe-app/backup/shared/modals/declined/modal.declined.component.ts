import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { IModalArgs } from '../modal';

@Component({
  selector: 'app-declined-modal',
  templateUrl: './modal.declined.component.html'
})
export class DeclinedModalComponent {
  @Input() args: IModalArgs;
  constructor(private modalService: ModalService) {
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
