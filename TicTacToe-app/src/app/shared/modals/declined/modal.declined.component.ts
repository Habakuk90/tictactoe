import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-declined-modal',
  templateUrl: './modal.declined.component.html'
})
export class DeclinedModalComponent {
  @Input() enemyUserName;
  constructor(private modalService: ModalService) {
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
