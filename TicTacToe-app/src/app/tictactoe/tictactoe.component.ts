import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { Router } from '@angular/router';
import { TicTacToeService } from './tictactoe.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modals/modal.service';
import { Boxes } from './boxes';

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
  private selfTileState = 'circle';
  private groupName: string;
  private gameTile = 'circle';
  public boxes = new Boxes();
  private winningTileId: string;
  private winningLine: string;
  private hasWon: boolean;

  private turnSubscription: Subscription;
  private groupNameSubscription: Subscription;

  constructor(private connectionService: HubConnectionService, private router: Router,
    private tictactoeService: TicTacToeService, private modalService: ModalService) {

    const that = this;
    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        connectionService.connection.on('TileChange', (tileId) => {
          that.boxes.setState(tileId, that.gameTile);
          that.boxes.setLocked(tileId, true);
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
          that.boxes.setAllLocked();
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
    });
  }

  changeField(event: Event, tileId: string) {
    if (!this.turn ||
      this.boxes.getLocked(tileId) === true) {
      return;
    }
    this.connectionService.connection.invoke('TileClicked', this.groupName, tileId).then(() => {
      if (this.checkWin(tileId)) {
        this.tictactoeService
          .playerHasWon(this.groupName, tileId, this.winningLine);
      }
    });
  }

  checkWin(tileId: string) {
    const that = this;
    const columns = [];
    const rows = [];
    const diagonalTopLeft = [];
    const diagonalBottomLeft = [];

    // based on x-y e.g. 1-2 => first Row, second column
    const tileClickedRow = tileId.substring(0, 1);
    const tileClickedColumn = tileId.substring(2);

    for (let i = 1; i <= 3; i++) {
      this.boxes.boxes.forEach(x => {
        if (x.id.endsWith(tileClickedColumn) && x.id.startsWith(i.toString()) &&
          x.state === that.selfTileState) {
          columns.push(x);
        }
        if (x.id.startsWith(tileClickedRow) && x.id.endsWith(i.toString()) &&
          x.state === that.selfTileState) {
          rows.push(x);
        }
        if (x.id.startsWith(i.toString()) && x.state === that.selfTileState &&
          x.id.endsWith(i.toString())) {
          diagonalTopLeft.push(x);
        }
        if (x.id.startsWith(i.toString()) && x.id.endsWith((4 - i).toString()) &&
          x.state === that.selfTileState) {
          diagonalBottomLeft.push(x);
        }
      });
    }

    // set winning line in svg for winning row/column/diagonal
    if (columns.length > 2) {
      this.winningLine = 'column';
    } else if (rows.length > 2) {
      this.winningLine = 'row';
    } else if (diagonalTopLeft.length > 2) {
      this.winningLine = 'diagonalTopLeft';
    } else if (diagonalBottomLeft.length > 2) {
      this.winningLine = 'diagonalBottomLeft';
    }

    if (columns.length > 2 || rows.length > 2 || diagonalTopLeft.length > 2 || diagonalBottomLeft.length > 2) {
      this.hasWon = true;
      this.winningTileId = tileId;
      return true;
    }
    return false;

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
    const that = this;
    this.groupNameSubscription = this.tictactoeService.groupName
      .subscribe(groupName => {
        this.groupName = groupName;
        if (this.groupName === undefined ||
          this.groupName === '') {
          this.router.navigate(['/']);
          return;
        }
      });

    this.turnSubscription = this.tictactoeService.isTurn
      .subscribe(isTurn => {
        that.turn = isTurn;
      });

    that.selfTileState = that.turn ? 'cross' : 'circle';
  }

  ngOnDestroy() {
    this.connectionService.connection.off('TileChange');
    this.connectionService.connection.off('SwitchTurn');
    this.tictactoeService.reset();
    if (this.groupName) {
      this.tictactoeService.LeaveGroup(this.groupName);
    }
    this.turnSubscription.unsubscribe();
    this.groupNameSubscription.unsubscribe();

  }
}
