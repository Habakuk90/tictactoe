import { DOCUMENT } from '@angular/common';
import { Component, OnInit,  Renderer2, Inject } from '@angular/core';
import { HubConnectionService } from '../services/hubconnection.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  enemyUserName;
  connection;
  activeModal;
  modals = {
    challengedModal: 'challenged',
    waitingModal: 'waiting'
  };
  constructor(connectionService: HubConnectionService, render: Renderer2,
              @Inject(DOCUMENT) document) {

    connectionService.isConnected.subscribe(isConnected => {
      this.connection = connectionService.connection;
      if (isConnected) {
        this.connection.on('OpenModal', (enemy, modal) => {
          render.addClass(document.body, 'modal-open');
          this.activeModal = modal;
          this.enemyUserName = enemy;
        });

      }
    });

  }
  ngOnInit() {

  }

  onChallengeResponse(status) {
    this.connection.invoke('ChallengeResponse', this.enemyUserName, status);
  }
}
