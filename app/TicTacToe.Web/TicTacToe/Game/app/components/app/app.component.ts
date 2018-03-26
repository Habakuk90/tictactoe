import { Component } from '@angular/core';
import { ConnectionService } from '../services/connectionService.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConnectionService]
})
export class AppComponent {
    constructor(connectionService: ConnectionService) {
        connectionService.startConnection();
    }

}
