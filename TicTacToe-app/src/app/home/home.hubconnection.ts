import { BaseHubConnection } from '../shared/connections/base.hubconnection';

// TODO define args model
interface IHomeHubConnection {
  challengePlayer(...args: any[]): void;
  challengeResponse(...args: any[]): Promise<any>;
  onOpenModal(method: (...args: any[]) => void): void;
  onUpdateUserList(method: (...args: any[]) => void): void;
}

export class HomeHubConnection extends BaseHubConnection {

  constructor(route: string, name: string) {
    super(route, name);
  }
}

