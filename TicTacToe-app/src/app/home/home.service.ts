import { Injectable } from '@angular/core';
import { HomeHubConnection } from './home.hubconnection';

// TODO is this needed or is the homehubconnection enough; => depends on methods getting called from here in the future
@Injectable()
export class HomeService {
  hub: HomeHubConnection;

  constructor() {
    this.hub = new HomeHubConnection('/signalR', 'homehub');
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke('ChallengePlayer', ...args);
  }

  public challengeResponse(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke('ChallengeResponse', ...args);
  }

  public startGame(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke('StartGame', ...args);
  }

  public onStartGame(method: (...args: any[]) => void) {
    this.hub.isConnected.subscribe(x => {
      if (x) {
        this.hub.getConnection().on('StartGame', method);
      }
    });
  }

  public onOpenModal(method: (...args: any[]) => void) {
    this.hub.getConnection().on('OpenModal', method);
  }

  public onUpdateUserList(method: (...args: any[]) => void) {
    this.hub.isConnected.subscribe(x => {
      if (x) {
        this.hub.getConnection().on('UpdateUserList', method);
      }
    });
  }
}
