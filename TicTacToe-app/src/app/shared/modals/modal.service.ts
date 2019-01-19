import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { HubConnectionService } from '../services/hubconnection.service';
import { ConfigService } from '../utils/config.service';
import { HubConnection } from '@aspnet/signalr';

@Injectable()
export class ModalService {
  activeModal = new BehaviorSubject<string>('');
  modalArgs = new BehaviorSubject<object>({});
  connection: HubConnection;

  constructor(public connectionService: HubConnectionService) {
  }

  openModal(modalName: string, args: object) {
    this.activeModal.next(modalName);
    this.modalArgs.next(args);
  }

  closeModal() {
    this.activeModal.next('');
  }

  onOpenModal(method: (...args: any[]) => void) {
    this.connectionService.connection.on('OpenModal', method);
  }

  challengeResponse(...args: any[]) {
    this.connectionService.connection.invoke('ChallengeResponse', ...args);
  }

  startGame(...args: any[]): Promise<any> {
    return this.connectionService.connection.invoke('StartGame', ...args);
  }
}
