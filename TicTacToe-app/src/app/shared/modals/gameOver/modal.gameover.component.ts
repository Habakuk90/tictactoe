import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';
import { IModalArgs } from '../modal';

@Component({
  selector: 'app-gameover-modal',
  templateUrl: './modal.gameover.component.html'
})
export class GameOverModalComponent {
  @Input() args: IModalArgs;
  @Output() restartGame: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: ModalService) {

  }

  public tryAgain() {
    this.restartGame.emit();
  }

  public back() {
    this.modalService.closeModal();
  }
}
