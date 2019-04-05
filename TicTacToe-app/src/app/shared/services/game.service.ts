import { Injectable } from '@angular/core';
import { HubConnectionService } from './hubconnection.service';
import { ModalService } from '../modals/modal.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameService {
  public _HomeStateSubject = new BehaviorSubject<number>(0);
  // homeState = this._HomeStateSubject.asObservable();

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
