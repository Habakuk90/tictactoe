import { Injectable } from '@angular/core';
import { HomeHubConnection } from './home.hubconnection';

enum HomeConnMethods {
  ChallengePlayer = 'ChallengePlayer',
  ChallengeResponse = 'ChallengeResponse',
  StartGame = 'StartGame',
  OpenModal = 'OpenModal',
  UpdateUserList = 'UpdateUserList'
}

@Injectable()
export class HomeService {
  hub: HomeHubConnection;

  constructor() {
    this.hub = new HomeHubConnection('/signalR', 'homehub');
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke(HomeConnMethods.ChallengePlayer, ...args);
  }

  public challengeResponse(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke(HomeConnMethods.ChallengeResponse, ...args);
  }

  public startGame(...args: any[]): Promise<any> {
    return this.hub.getConnection().invoke(HomeConnMethods.StartGame, ...args);
  }

  public onStartGame(method: (...args: any[]) => void) {
    this.hub.isConnected.subscribe(x => {
      if (x) {
        this.hub.getConnection().on(HomeConnMethods.StartGame, method);
      }
    });
  }

  public onOpenModal(method: (...args: any[]) => void) {
    this.hub.getConnection().on(HomeConnMethods.OpenModal, method);
  }

  public onUpdateUserList(method: (...args: any[]) => void) {
    this.hub.isConnected.subscribe(x => {
      if (x) {
        this.hub.getConnection().on(HomeConnMethods.UpdateUserList, method);
      }
    });
  }
}
