import { BaseHubConnection } from './base.hubconnection';

// TODO define args model
interface IHomeHubConnection {
  addCurrentUser(...args: any[]): void;
  challengePlayer(...args: any[]): void;
  startGame(...args: any[]): Promise<void>;
  challengeResponse(...args: any[]): Promise<any>;
  onStartGame(method: (...args: any[]) => void): void;
  onOpenModal(method: (...args: any[]) => void): void;
  onUpdateUserList(method: (...args: any[]) => void): void;
}

export class HomeHubConnection extends BaseHubConnection implements IHomeHubConnection {

  constructor(route: string, name: string) {
    super(route, name);
  }

  public addCurrentUser(...args: any[]): void {
    this.isConnected.subscribe(x => {
      if (x) {
        this.getConnection().invoke('AddCurrentUser', ...args).catch(t => console.log(t));
      }
    });
  }

  public challengePlayer(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengePlayer', ...args);
  }

  public startGame(...args: any[]): Promise<any> {
    return this.getConnection().invoke('StartGame', ...args);
  }

  public challengeResponse(...args: any[]): Promise<any> {
    return this.getConnection().invoke('ChallengeResponse', ...args);
  }

  public onStartGame(method: (...args: any[]) => void) {
    this.getConnection().on('StartGame', method);
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

