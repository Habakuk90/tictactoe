import { Component } from '@angular/core';
import { HubConnectionService } from './shared/services/hubconnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isConnected = false;
  constructor(connectionService: HubConnectionService) {
    connectionService.startConnection().then(() => this.isConnected = true);
  }
}
