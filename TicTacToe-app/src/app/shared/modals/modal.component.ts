import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';

enum Modals {
  None = '',
  ChallengeModal = 'challenged'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // TODOANDI modals auslagern und typeFest machen
  modals = {
    none: '',
    challengedModal: 'challenged',
    waitingModal: 'waiting',
    declinedModal: 'declined',
    gameoverModal: 'gameover'
  };
  activeModal = this.modals.none;
  activeModalSubscription: Subscription;

  selectedGame: string;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal.name;
      });
  }

  onChallengeResponse(status: any) {
    this.modalService.closeModal();
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
