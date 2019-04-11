import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../../node_modules/rxjs';
import { HubConnection } from '@aspnet/signalr';
import { UserService } from '../services/user.service';

@Injectable()
export class ModalService {
  activeModal = new BehaviorSubject<string>('');
  modalArgs = new BehaviorSubject<object>({});
  connection: HubConnection;

  constructor(public userService: UserService) {
  }

  openModal(modalName: string, args: object) {
    this.activeModal.next(modalName);
    this.modalArgs.next(args);
  }

  closeModal() {
    this.activeModal.next('');
  }

  onOpenModal(method: (...args: any[]) => void) {
    this.userService.hub.connection.on('OpenModal', method);
  }

  challengeResponse(...args: any[]) {
    this.userService.hub.connection.invoke('ChallengeResponse', ...args);
  }

  startGame(...args: any[]): Promise<any> {
    return this.userService.hub.connection.invoke('StartGame', ...args);
  }
}
