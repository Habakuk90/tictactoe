import { Component } from '@angular/core';
import { GameHubConnection } from '../services/gameHubConnection.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [GameHubConnection]
})
export class AppComponent {
    constructor(connectionService: GameHubConnection) {
        connectionService.startConnection();
    }

}
