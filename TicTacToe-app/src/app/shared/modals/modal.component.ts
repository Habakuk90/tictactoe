import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  connection;

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

  // TODOANDI statt object ein Interface verwenden
  modalArgs: object;
  modalArgsSubscription: Subscription;

  selectedGame: string;

  constructor(private modalService: ModalService,
              private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.hub.isConnected.subscribe((isConnected => {
      if (isConnected) {
        this.homeService.onOpenModal((enemy: string, gameName: string, modalName: string) => {
          this.selectedGame = gameName;

          this.modalService.openModal(modalName, {enemyUserName: enemy});
        });
      }
    }));

    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
    this.modalArgsSubscription = this.modalService.modalArgs
      .subscribe(args => this.modalArgs = args);
  }

  onChallengeResponse(status: any) {
    this.homeService.challengeResponse(this.modalArgs['enemyUserName'], this.selectedGame, status);
    this.modalService.closeModal();
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
