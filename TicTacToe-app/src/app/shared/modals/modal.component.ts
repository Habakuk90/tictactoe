import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { Modal, Modals } from './modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  activeModal = new Modal(Modals.empty, {});
  activeModalSubscription: Subscription;
  modals = Modals;
  selectedGame: string;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
  }

  onChallengeResponse(status: any) {
    this.modalService.closeModal();
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
