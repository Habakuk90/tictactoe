import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gameover-modal',
  templateUrl: './modal.gameover.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class GameOverModalComponent {
  @Input() args;

  constructor() {

  }
}
