import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-challenged-modal',
  templateUrl: './modal.challenged.component.html'
  // styleUrls: ['./modal.challenged.component.scss']
})
export class ChallengedModalComponent {
  @Input() enemyUserName;
  @Output() challengeResponse: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  accept() {
    this.challengeResponse.emit('accepted');
  }

  decline() {
    this.challengeResponse.emit('declined');
  }
}
