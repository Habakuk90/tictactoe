import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { HubConnectionService } from '../services/hubconnection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  enemyUserName;
  connection;
  modals = {
    none: '',
    challengedModal: 'challenged',
    waitingModal: 'waiting',
    declinedModal: 'declined'
  };
  activeModal = this.modals.none;
  activeModalSubscription: Subscription;


  constructor(connectionService: HubConnectionService,
    private modalService: ModalService) {
    connectionService.isConnected.subscribe(isConnected => {
      this.connection = connectionService.connection;
      if (isConnected) {
        this.connection.on('OpenModal', (enemy, modal) => {
          modalService.openModal(modal);
          this.enemyUserName = enemy;
        });
      }
    });
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
  }

  onChallengeResponse(status) {
    this.connection.invoke('ChallengeResponse', this.enemyUserName, status);
    this.modalService.closeModal();
  }
}
