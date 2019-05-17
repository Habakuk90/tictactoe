import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TicTacToeService } from './tictactoe.service';
import { Box } from './box';
import { BoxHandler } from './boxHandler';
import { ModalService } from 'src/app/shared/modals/modal.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { Router } from '@angular/router';
import { HubComponent } from 'src/app/shared/connections/base.hubconnection';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy, HubComponent {
  @ViewChild('winSvg', {
    read: ElementRef
  }) svg: ElementRef;

  public turn: boolean = false;
  public selfTileState = 'circle';
  private gameTile = 'circle';
  private hasWon: boolean;
  private boxHandler: BoxHandler = new BoxHandler();

  public get boxes(): Box[]{
    return this.boxHandler.boxes;
  }

  constructor(private tictactoeService: TicTacToeService,
    private userService: UserService,
    private modalService: ModalService,
    private groupService: GroupService,
    private router: Router) {
      const that = this;

      this.groupService._groupNameSubject
        .subscribe(groupName => {
          if (groupName === undefined ||
            groupName === '') {
            that.router.navigate(['/']);
            return;
          }
        });
    }

  changeField(tileId: string) {
    const that = this;
    if (!this.turn ||
      that.boxHandler.findById(tileId).locked === true) {
      return;
    }

    this.tictactoeService.tileClicked(this.groupService.groupName, tileId).then(() => {
      this.hasWon = this.boxHandler.checkWin(tileId);

      if (this.boxHandler.checkWin(tileId)) {
        this.tictactoeService
          .gameOver(this.groupService.groupName, tileId, this.boxHandler.winningLine);
      } else if (this.boxes.filter(x => !x.state).length === 0) {
        this.tictactoeService.gameOver(this.groupService.groupName, null, null);
      }
    });
  }

  ngOnInit() {
    const that = this;
    this.selfTileState = this.turn ? 'cross' : 'circle';

    this.tictactoeService.hub.isConnected.subscribe((isConnected: boolean) => {
      if (isConnected) {
        that.registerOnMethods();
        this.setLine(null, null);
        that.modalService.closeModal();

        this.tictactoeService.hub.addCurrentUser(that.userService.currentUserName).then(() => {
          that.tictactoeService.hub.joinGroup(that.groupService.groupName)
            .then(groupName => {
              // #9 start besser definieren
              if (groupName.startsWith(that.userService.currentUserName)) {
                that.turn = !that.turn;
              }
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.tictactoeService.reset();

    if (this.groupService.groupName) {
      this.tictactoeService.hub.leaveGroup(this.groupService.groupName);
    }
  }

  registerOnMethods() {
    const that = this;

    this.tictactoeService.onTileChange((tileId) => {
      const box: Box = that.boxHandler.findById(tileId);
      box.state = that.gameTile;
      box.locked = true;
    });

    this.tictactoeService.onSwitchTurn(() => {
      that.turn = !that.turn;

      if (that.gameTile === 'circle') {
        that.gameTile = 'cross';
      } else {
        that.gameTile = 'circle';
      }
    });

    this.tictactoeService.onGameOver((winningTileId, winningLine) => {
      that.endGame(winningTileId, winningLine);
    });
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

  private endGame(winningTileId: string, winningLine: string): void {
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
}
