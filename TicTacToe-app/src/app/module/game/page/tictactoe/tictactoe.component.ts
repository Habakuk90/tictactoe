import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { GameHubConnection } from 'src/app/connections/game.hubconnection';
import { HubService } from 'src/app/connections/hub.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { BoxHandler } from '../../data/boxHandler';
import { Box } from '../../data/box';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy, HubComponent {
  @ViewChild('winSvg', {
    static: false,
    read: ElementRef
  }) svg: ElementRef;

  public turn = false;
  public selfTileState = 'circle';
  private boxHandler: BoxHandler = new BoxHandler();

  hub: GameHubConnection;

  public get boxes(): Box[] {
    return this.boxHandler.boxes;
  }

  constructor(// private modalService: ModalService,
    private groupService: GroupService) {

      // this.hub = this.hubService.createConnection('/tictactoe', 'tictactoe', GameHubConnection);

      this.groupService._groupNameSubject
        .subscribe(() => {
          // if (groupName === undefined ||
          //   groupName === '') {
          //   that.router.navigate(['/']);
          //   return;
          // }
        });
    }

  changeField(tileId: string) {
    const that = this;
    if (!this.turn ||
      that.boxHandler.findById(tileId).locked === true) {
      return;
    }

  }

  ngOnInit() {
    this.selfTileState = this.turn ? 'cross' : 'circle';


  }

  ngOnDestroy() {
    // const leaveGroup: Promise<void>;

    // if (this.groupService.groupName) {
    //   leaveGroup = this.hub.leaveGroup(this.groupService.groupName);
    // }
    // if (leaveGroup) {
    //   leaveGroup.then(() => {
    //     that.hub.stopConnection();
    //   });
    // }
  }

  registerOnMethods() {

    // this.hub.onTileChange((tileId) => {
    //   const box: Box = that.boxHandler.findById(tileId);
    //   box.state = that.gameTile;
    //   box.locked = true;
    // });

    // this.hub.onSwitchTurn(() => {
    //   that.turn = !that.turn;

    //   if (that.gameTile === 'circle') {
    //     that.gameTile = 'cross';
    //   } else {
    //     that.gameTile = 'circle';
    //   }
    // });

    // this.hub.onGameOver((winningTileId, winningLine) => {
    //   that.endGame(winningTileId, winningLine);
    // });



    // this.hub.tileClicked(this.groupService.groupName, tileId).then(() => {
    //   this.hasWon = this.boxHandler.checkWin(tileId);

    //   if (this.boxHandler.checkWin(tileId)) {
    //     this.hub.gameOver(this.groupService.groupName, tileId, this.boxHandler.winningLine);
    //   } else if (this.boxes.filter(x => !x.state).length === 0) {
    //     this.hub.gameOver(this.groupService.groupName, null, null);
    //   }
    // });

    // this.hub.isConnected.subscribe((isConnected: boolean) => {
    //   if (isConnected) {
    //     this.setLine(null, null);
    //     // that.modalService.closeModal();
    //     this.hub.addCurrentUser(that.userService.currentUserName, that.userService.isAnonymous).then(() => {
    //       that.hub.joinGroup(that.groupService.groupName)
    //         .then(groupName => {
    //           // #9 start besser definieren
    //           if (groupName.startsWith(that.userService.currentUserName)) {
    //             that.turn = !that.turn;
    //           }
    //       });
    //     });
    //   }
    // });
  }

  private setLine(tileId: string, winningLine: string) {
    const svgLineAxes = this.svg.nativeElement.firstChild.attributes;

    if (winningLine === 'column') {
      // column number * 2 - 1 = (1/3/5) * 16.3333333%
      const columnLinePosition = ((parseInt(tileId.substring(2), 10) * 2) - 1) * (1 / 6 * 100);
      svgLineAxes.x1.value = columnLinePosition + '%';
      svgLineAxes.x2.value = columnLinePosition + '%';
      svgLineAxes.y1.value = '0';
      svgLineAxes.y2.value = '100%';
    } else if (winningLine === 'row') {
      // row number * 2 - 1 = (1/3/5) * 16.3333333%
      const rowLinePosition = ((parseInt(tileId.substring(0, 1), 10) * 2) - 1) * (1 / 6 * 100);
      svgLineAxes.x1.value = '0';
      svgLineAxes.x2.value = '100%';
      svgLineAxes.y1.value = rowLinePosition + '%';
      svgLineAxes.y2.value = rowLinePosition + '%';
    } else if (winningLine === 'diagonalTopLeft') {
      svgLineAxes.x1.value = '100%';
      svgLineAxes.x2.value = '0';
      svgLineAxes.y1.value = '100%';
      svgLineAxes.y2.value = '0';
    } else if (winningLine === 'diagonalBottomLeft') {
      svgLineAxes.x1.value = '100%';
      svgLineAxes.x2.value = '0';
      svgLineAxes.y1.value = '0';
      svgLineAxes.y2.value = '100%';
    } else {
      return;
    }

    this.svg.nativeElement.classList.add('active');
  }

}
