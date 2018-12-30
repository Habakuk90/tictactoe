import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gameover-modal',
  templateUrl: './modal.gameover.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class GameOverModalComponent {
  @Input() args: any;
  @Output() restartGame: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  public tryAgain() {
    this.restartGame.emit();
    // connection.invoke('StartGame', groupName, )
  }
}
