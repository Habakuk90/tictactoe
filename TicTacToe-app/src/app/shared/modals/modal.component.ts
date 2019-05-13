import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { GroupService } from '../services/group.service';
import { HomeService } from 'src/app/home/home.service';
import { Router } from '@angular/router';

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

  groupName: string;

  constructor(private modalService: ModalService,
              private groupService: GroupService,
              private homeService: HomeService) {
    this.groupService.groupName.subscribe(x => this.groupName = x);
  }

  ngOnInit() {
    // TODOANDO isConnected: is there any better way?
    this.homeService.hub.isConnected.subscribe((isConnected => {
      if (isConnected) {
        this.homeService.hub.onOpenModal((enemy: string, gameName: string, modalName: string) => {
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
    this.homeService.hub.challengeResponse(this.modalArgs['enemyUserName'], this.selectedGame, status);
    this.modalService.closeModal();
  }

  gameRestart() {
    throw new Error('not implemented');
  }
}
