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
  connection;
  // TODO modals auslagern und typeFest machen
  modals = {
    none: '',
    challengedModal: 'challenged',
    waitingModal: 'waiting',
    declinedModal: 'declined',
    gameoverModal: 'gameover'
  };
  activeModal = this.modals.none;
  activeModalSubscription: Subscription;

  // statt object ein Interface verwenden
  modalArgs: object;
  modalArgsSubscription: Subscription;


  constructor(connectionService: HubConnectionService,
    private modalService: ModalService) {
    connectionService.isConnected.subscribe(isConnected => {
      this.connection = connectionService.connection;
      if (isConnected) {
        this.connection.on('OpenModal', (enemy, modalName) => {
          modalService.openModal(modalName, {enemyUserName: enemy});
        });
      }
    });
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
    this.modalArgsSubscription = this.modalService.modalArgs
      .subscribe(args => this.modalArgs = args);
  }

  onChallengeResponse(status) {
    this.connection.invoke('ChallengeResponse', this.modalArgs['enemyUserName'], status);
    this.modalService.closeModal();
  }
}
