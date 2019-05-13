import { Injectable } from '@angular/core';
import { HomeHubConnection } from './home.hubconnection';

// TODO is this needed or is the homehubconnection enough; => depends on methods getting called from here in the future
@Injectable()
export class HomeService {
  hub: HomeHubConnection;

  constructor() {
    this.hub = new HomeHubConnection('/signalR', 'homehub');
  }
}
