import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-gameover-modal',
  templateUrl: './modal.gameover.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class GameOverModalComponent {
  @Input() args: any;
  @Output() restartGame: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: ModalService) {

  }

  public tryAgain() {
    this.restartGame.emit();
    // restartGame needed Hub (which hub?)
  }

  public back() {
    this.modalService.closeModal();
  }
}
