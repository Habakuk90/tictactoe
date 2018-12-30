import { Injectable } from '@angular/core';
import { HubConnectionService } from './hubconnection.service';
import { ModalService } from '../modals/modal.service';

@Injectable()
export class GameService {

  constructor(public connectionService: HubConnectionService, public modalService: ModalService) {

  }

  public startGame(groupName: string) {
    let promise: Promise<string>;

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        promise = this.connectionService.connection.invoke('StartGame', groupName);
      }
    });

    return promise;
  }
}
