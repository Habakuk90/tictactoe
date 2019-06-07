import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { Modal, Modals } from './modal';
import { HubService } from '../connections/hub.service';
import { HomeHubConnection, ChallengeResponse } from 'src/app/home/home.hubconnection';

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
    // TODOANDI magic strings
    const hub: HomeHubConnection = this.hubService.getByName('homehub');
    const resp: ChallengeResponse =
      new ChallengeResponse(this.activeModal.args.enemyUserName, 'tictactoe', status);

    hub.challengeResponse(resp);
    this.modalService.closeModal();
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
