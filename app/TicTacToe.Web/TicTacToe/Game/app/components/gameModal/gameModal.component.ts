import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'game-modal',
    templateUrl: './gameModal.component.html',
    styleUrls: ['./gameModal.component.css']
})
export class GameModalComponent {
    @Input() isModalActive: string;
    @Input() enemyUserName: string;
    @Output() response: EventEmitter<string> = new EventEmitter<string>();
    
    accept(event: Event) {
        this.response.emit('accepted');
    };
    decline(event: Event) {
        this.response.emit('declined');
    };
}
