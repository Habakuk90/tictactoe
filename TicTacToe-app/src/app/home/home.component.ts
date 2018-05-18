import { Component, OnInit } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  connection: HubConnection;
  message: string;
  constructor(connectionService: HubConnectionService) {
    this.connection = connectionService.connection;
    connectionService.startConnection().then(() => {
      this.connection.on('SendAll', (res) => {
        this.message = res;
      });
    });
  }

  ngOnInit() {

  }

  hello(message) {
    this.connection.invoke('SendAll', message.value);
  }
}
