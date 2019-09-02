import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { Modal, Modals } from './modal';
import { HomeHubConnection, ChallengeResponse } from 'src/app/connections/home.hubconnection';
import { HubService } from 'src/app/connections/hub.service';

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

  constructor(private modalService: ModalService, private hubService: HubService) {
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
  }

  onChallengeResponse(status: any) {
    const hub: HomeHubConnection = this.hubService.getByType(HomeHubConnection.prototype);
    // const hub: HomeHubConnection = this.hubService.getByName('homehub');

    const resp: ChallengeResponse =
      new ChallengeResponse(this.activeModal.args.enemyUserName, 'tictactoe', status);

    if (hub.isConnected.value) {
      hub.challengeResponse(resp);
      this.modalService.closeModal();
    }
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
