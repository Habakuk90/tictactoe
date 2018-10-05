import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { Router } from '@angular/router';
import { TicTacToeService } from './tictactoe.service';
import { ModalService } from '../shared/modals/modal.service';
import { Box } from './box';
import { BoxHandler } from './boxHandler';

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
  private winningTileId: string;
  private winningLine: string;
  private hasWon: boolean;
  private boxHandler: BoxHandler = new BoxHandler();
  public boxes: Box[];

  constructor(private connectionService: HubConnectionService, private router: Router,
    private tictactoeService: TicTacToeService, private modalService: ModalService) {
    const that = this;
    that.boxes = that.boxHandler.boxes;

    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        connectionService.connection.on('TileChange', (tileId) => {
          const box: Box = that.boxHandler.findById(tileId);
          box.state = that.gameTile;
          box.locked =  true;
        });

        connectionService.connection.on('SwitchTurn', () => {
          tictactoeService.switchTurn();
          if (that.gameTile === 'circle') {
            that.gameTile = 'cross';
          } else {
            that.gameTile = 'circle';
          }
        });

        connectionService.connection.on('GameOver', (winningTileId, winningLine) => {
          that.boxHandler.setAllLocked();
          that.turn = false;
          that.winningLine = winningLine;
          that.winningTileId = winningTileId;
          this.setLine();
          this.modalService.openModal('gameover', {
            hasWon: this.hasWon
          });
        });
      }

      tictactoeService.hasWon.subscribe(x => that.hasWon = x);
      tictactoeService.isTurn.subscribe(isTurn => that.turn = isTurn);
      tictactoeService.groupName
        .subscribe(groupName => {
          this.groupName = groupName;
          if (this.groupName === undefined ||
            this.groupName === '') {
            this.router.navigate(['/']);
            return;
          }
        });
    });
  }

  changeField(event: Event, tileId: string) {
    if (!this.turn ||
      this.boxHandler.findById(tileId).locked === true) {
      return;
    }
    this.connectionService.connection.invoke('TileClicked', this.groupName, tileId).then(() => {
      const clickedBox: Box = this.boxHandler.findById(tileId);
      if (this.boxHandler.checkWin(clickedBox)) {
        this.tictactoeService
          .playerHasWon(this.groupName, tileId, this.boxHandler.winningLine);
      }
    });
  }

  private setLine() {
    const svgLineAxes = this.svg.nativeElement.firstChild.attributes;
    const winningLine = this.winningLine;
    const tileId = this.winningTileId;

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

    this.svg.nativeElement.classList.add('active');
  }

  ngOnInit() {
    this.selfTileState = this.turn ? 'cross' : 'circle';
  }

  ngOnDestroy() {
    this.connectionService.connection.off('TileChange');
    this.connectionService.connection.off('SwitchTurn');
    this.tictactoeService.reset();
    if (this.groupName) {
      this.tictactoeService.LeaveGroup(this.groupName);
    }
  }
}
