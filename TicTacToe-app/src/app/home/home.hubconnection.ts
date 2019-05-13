import { BaseHubConnection } from '../shared/connections/base.hubconnection';

// TODO define args model
interface IHomeHubConnection {
  challengePlayer(...args: any[]): void;
  challengeResponse(...args: any[]): Promise<any>;
  onOpenModal(method: (...args: any[]) => void): void;
  onUpdateUserList(method: (...args: any[]) => void): void;
}

export class HomeHubConnection extends BaseHubConnection implements IHomeHubConnection {

  constructor(route: string, name: string) {
    super(route, name);
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }

  public challengeResponse(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengeResponse', ...args);
  }

  public onOpenModal(method: (...args: any[]) => void) {
    this.getConnection().on('OpenModal', method);
  }

  public onUpdateUserList(method: (...args: any[]) => void) {
    this.isConnected.subscribe(x => {
      if (x) {
        this.getConnection().on('UpdateUserList', method);
      }
    });
  }
}

