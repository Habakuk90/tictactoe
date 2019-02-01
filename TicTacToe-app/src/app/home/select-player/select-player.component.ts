import {Component, Input} from '@angular/core';
import { IGame } from 'src/app/shared/models/game.interface';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html'
  // styleUrls: ['./home.component.scss']
})

export class SelectPlayerComponent {

  @Input() selectedGame: IGame;
  // userOnline: any;
  // currentUser: string;
  // selectedPlayer: string;

  // constructor(private connectionService: HubConnectionService, userService: UserService,
  //   private groupService: GroupService, private modalService: ModalService,
  //   private spinnerService: SpinnerService,
  //   private router: Router) {
  //     userService.getUserName().subscribe(res => {
  //       this.currentUser =  res.toString();
  //     }, err => userService.logout());

  //     connectionService.isConnected.subscribe(isConnected => {
  //       const that = this;
  //       if (isConnected) {
  //         this.connectionService.updateUserList(userOnline => {
  //           this.userOnline = userOnline;
  //         });

  //         this.connectionService.onStartGame((groupName, gameName) => {
  //           that.spinnerService.toggleSpinner();
  //           that.groupService.joinGroup(groupName).then(() => {
  //             that.router.navigate([gameName]);
  //             that.spinnerService.toggleSpinner();
  //             that.modalService.closeModal();
  //           });
  //         });

  //         this.connectionService.addCurrentUser(userService.currentUserName);
  //       }
  //     });
  // }

  // challengeSelectedPlayer() {
  //   this.connectionService.challengePlayer(this.selectedPlayer, 'tictactoe');
  //     this.selectedPlayer = '';
  // }



  // ngOnDestroy() {
  //   this.connectionService.connection.off('StartGame');
  //   this.connectionService.connection.off('UpdateUserList');
  //   this.connectionService.connection.off('SwitchTurn');
  //   this.connectionService.connection.off('JoinGroup');
  // }
}
