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

  constructor(connectionService: HubConnectionService) {
    this.connection = connectionService.getConnection();
  }

  ngOnInit() {
    this.connection.invoke('send', 'Hallo').then(res => {
      console.log(res);
    });
  }

}
