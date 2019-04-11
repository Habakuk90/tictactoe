import { Component, OnInit } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';

@Component({
  selector: 'app-test-site',
  templateUrl: './test-site.component.html',
  styleUrls: ['./test-site.component.scss']
})
export class TestSiteComponent implements OnInit {

  // constructor(connectionService: HubConnectionService) {
  //   connectionService.isConnected.subscribe(isConnected => {
  //     if (isConnected) {
  //       connectionService.connection.invoke('SendAll', 'wat');
  //       connectionService.connection.on('Test', message => console.log(message));
  //     }
  //   });
  //  }

  ngOnInit() {

  }

}
