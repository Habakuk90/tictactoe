import { Component, Input } from '@angular/core';
import { ConnectionService } from '../services/connectionService.service';
import { HubConnection } from '@aspnet/signalr';

@Component({
    selector: 'game-modal',
    templateUrl: './gameModal.component.html',
    styleUrls: ['./gameModal.component.css']
})
export class GameModalComponent {
    @Input() activeModal: string;
    @Input() challengerUser: string;
    @Input() connection: HubConnection
    ngOnInit() {
        var that = this;
        // Enemy reacted to your challenge
        this.connection.on('Response', function (enemy, action) {
            console.log(enemy, action);
        });
    }
    accept(event: Event) {
        var that = this;
        var action = 'accepted';
        that.connection.invoke('ChallengeResponse', that.challengerUser, action);

    };
    decline(event: Event) {
        var that = this;
        var action = 'declined';
        that.connection.invoke('ChallengeResponse', that.challengerUser, action);

    };

    gameStart() {
        var that = this;
        that.connection.invoke('GameStart');
    }
}
