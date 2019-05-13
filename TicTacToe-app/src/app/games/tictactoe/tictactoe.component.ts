import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeService } from './tictactoe.service';
import { Box } from './box';
import { BoxHandler } from './boxHandler';
import { ModalService } from 'src/app/shared/modals/modal.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {
  @ViewChild('winSvg', {
    read: ElementRef
  }) svg: ElementRef;

  public turn: boolean;
  public selfTileState = 'circle';
  private groupName: string;
  private gameTile = 'circle';
  private hasWon: boolean;
  private boxHandler: BoxHandler = new BoxHandler();
  public boxes: Box[];

  constructor(private router: Router,
    private tictactoeService: TicTacToeService,
    private modalService: ModalService, private groupService: GroupService,
    private userService: UserService) {
      const that = this;
      that.boxes = that.boxHandler.boxes;

      // FIXME
      // tictactoeService.hub.hub.onStartGame((groupName: string) => {
      //   console.log('start');
      //   this.boxes = this.boxHandler.createBoxes();
      //   this.boxHandler.setAllUnlocked();
      //   this.setLine(null, null);
      //   this.ngOnInit();
      //   // that.spinner
      //   that.modalService.closeModal();
      // });

      // tictactoeService.hub.connection.on('GameOver', (winningTileId, winningLine) => {
      //   this.endGame(winningTileId, winningLine);
      // });

      tictactoeService.hasWon.subscribe(x => that.hasWon = x);
      tictactoeService.isTurn.subscribe(isTurn => that.turn = isTurn);
      groupService.groupName
        .subscribe(groupName => {
          // this.groupName = groupName;
          // if (this.groupName === undefined ||
          //   this.groupName === '') {
          //   this.router.navigate(['/']);
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

    this.tictactoeService.hub.getConnection().invoke('TileClicked', this.groupName, tileId).then(() => {
      const clickedBox: Box = this.boxHandler.findById(tileId);

      if (this.boxHandler.checkWin(clickedBox)) {
        this.tictactoeService
          .gameOver(this.groupName, tileId, this.boxHandler.winningLine);
      } else if (this.boxes.filter(x => !x.state).length === 0) {
        this.tictactoeService.gameOver(this.groupName, null, null);
      }
    });
  }

  private endGame(winningTileId: any, winningLine: any) {
    const that = this;

    that.boxHandler.setAllLocked();
    that.turn = false;

    if (winningTileId != null) {
      this.setLine(winningTileId, winningLine);
    }

    this.modalService.openModal('gameover', {
      hasWon: this.hasWon
    });
  }

  private setLine(tileId: string, winningLine: string) {
    const svgLineAxes = this.svg.nativeElement.firstChild.attributes;
    // const winningLine = this.winningLine;
    // const tileId = this.winningTileId;

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
    }

    this.svg.nativeElement.classList.toggle('active');
  }

  ngOnInit() {
    const that = this;
    this.selfTileState = this.turn ? 'cross' : 'circle';

    this.tictactoeService.hub.isConnected.subscribe(x => {
      if (x) {
        this.tictactoeService.onTileChange((tileId) => {
          const box: Box = that.boxHandler.findById(tileId);
          box.state = that.gameTile;
          box.locked = true;
        });

        this.tictactoeService.onSwitchTurn(() => {
          this.tictactoeService.switchTurn();
          if (that.gameTile === 'circle') {
            that.gameTile = 'cross';
          } else {
            that.gameTile = 'circle';
          }
        });

        /// TODOANDI waaaay too much || is there a equivalent to vuex store and automated watching.
        this.userService.userName.subscribe((userName: string) => {
          if (userName.trim().length > 0) {
            this.tictactoeService.hub.isConnected.subscribe((isConnected: boolean) => {
              if (isConnected) {
                this.tictactoeService.hub.addCurrentUser(userName).then(x => {
                  this.tictactoeService.hub.joinGroup('TESTGROUPNAME' || x)
                  .then(groupName => {
                    that.groupName = groupName;
                        // TODOANDI start besser definieren
                    if (that.groupName.startsWith(that.userService.currentUserName)) {
                      that.tictactoeService.switchTurn();
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.tictactoeService.reset();

    if (this.groupName) {
      this.tictactoeService.hub.leaveGroup(this.groupName);
    }
  }
}
