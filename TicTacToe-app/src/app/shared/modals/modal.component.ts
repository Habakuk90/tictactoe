import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { HubConnectionService } from '../services/hubconnection.service';
import { Subscription } from 'rxjs';
import { GroupService } from '../services/group.service';

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

  selectedGame: string;

  groupName: string;

  constructor(private modalService: ModalService,
    groupService: GroupService) {
    this.modalService.connectionService.isConnected.subscribe((isConnected => {
        if (isConnected) {
          this.modalService.onOpenModal((enemy: string, gameName: string, modalName: string) => {
            this.selectedGame = gameName;
            modalService.openModal(modalName, {enemyUserName: enemy});
          });
        }
      }));

    groupService.groupName.subscribe(x => this.groupName = x);
  }

  ngOnInit() {
    this.activeModalSubscription = this.modalService.activeModal
      .subscribe(activeModal => {
        this.activeModal = activeModal;
      });
    this.modalArgsSubscription = this.modalService.modalArgs
      .subscribe(args => this.modalArgs = args);
  }

  onChallengeResponse(status: any) {
    this.modalService.challengeResponse(this.modalArgs['enemyUserName'], this.selectedGame, status);
    // this.connection.invoke('StartGame')
    this.modalService.closeModal();
  }

  gameRestart() {
    this.modalService.startGame(this.groupName).then(() => {
      this.modalService.closeModal();
    });
  }
}
