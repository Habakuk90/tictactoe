import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeHubConnection } from '../shared/connections/home.hubconnection';

@Injectable()
export class HomeService {
  hub: HomeHubConnection;

  constructor() {
    this.hub = new HomeHubConnection('/signalR', 'homehub');
  }
}
