import { BaseHubConnection } from '../shared/connections/base.hubconnection';
import { IGame } from '../shared/models/game.interface';

// TODO define args model
interface IHomeHubConnection {
  challengePlayer(...args: any[]): void;
  challengeResponse(...args: any[]): Promise<any>;
  onOpenModal(method: (...args: any[]) => void): void;
  onUpdateUserList(method: (...args: any[]) => void): void;
}

enum HomeConnMethods {
  ChallengePlayer = 'ChallengePlayer',
  ChallengeResponse = 'ChallengeResponse',
  StartGame = 'StartGame',
  OpenModal = 'OpenModal',
  UpdateUserList = 'UpdateUserList'
}

export class HomeHubConnection extends BaseHubConnection {

  constructor(route: string, name: string) {
    super(route, name);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke(HomeConnMethods.ChallengePlayer, ...args);
  }

  public challengeResponse(...args: Array<ChallengeResponse>): Promise<any> {
    return this.getConnection().invoke(HomeConnMethods.ChallengeResponse, ...args);
  }

  public startGame(...args: any[]): Promise<any> {
    return this.getConnection().invoke(HomeConnMethods.StartGame, ...args);
  }

  public onStartGame(method: (...args: any[]) => void) {
    this.isConnected.subscribe(x => {
      if (x) {
        this.getConnection().on(HomeConnMethods.StartGame, method);
      }
    });
  }

  public onOpenModal(method: (...args: any[]) => void) {
    this.getConnection().on(HomeConnMethods.OpenModal, method);
  }

  public onUpdateUserList(method: (...args: any[]) => void) {
    this.isConnected.subscribe(x => {
      if (x) {
        this.getConnection().on(HomeConnMethods.UpdateUserList, method);
      }
    });
  }
}

export class ChallengeResponse {
  constructor(public enemyName: string, public gameName: string, public response: string) {}
}
