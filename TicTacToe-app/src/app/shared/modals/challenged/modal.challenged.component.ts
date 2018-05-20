import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-challenged-modal',
  templateUrl: './modal.challenged.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class ChallengedModalComponent {
  @Input() enemyUserName;
  @Output() response: EventEmitter<string> = new EventEmitter<string>();
  constructor() {

  }

  accept() {
    this.response.emit('accepted');
  }

  decline() {
    this.response.emit('declined');
  }
}
