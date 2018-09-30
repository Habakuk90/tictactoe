import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { Router } from '@angular/router';
import { TicTacToeService } from './tictactoe.service';
import { Subscription } from 'rxjs';
import { Box } from './boxes.interface';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {
  public turn: boolean;
  selfTileState = 'circle';
  private groupName: string;
  gameTile = 'circle';
  winningTile = '';


  turnSubscription: Subscription;
  groupNameSubscription: Subscription;
  isTurn: any;
  hasWon: boolean;

  constructor(private connectionService: HubConnectionService, private router: Router,
            private tictactoeService: TicTacToeService) {

    const that = this;
    connectionService.isConnected.subscribe(isConnected => {
      // that.turn = false;
      if (isConnected) {
        connectionService.connection.on('TileChange', (tileId) => {
          that.boxes.filter(x => x.id === tileId)[0].state = that.gameTile;
          that.boxes.filter(x => x.id === tileId)[0].locked = true;


        });
        connectionService.connection.on('SwitchTurn', () => {
          // that.turn = !that.turn;
          tictactoeService.switchTurn();
          // that.gameTile = 'circle' ? 'cross' : 'circle';
          if (that.gameTile === 'circle') {
            that.gameTile = 'cross';
          } else {
            that.gameTile = 'circle';
          }
        });

        connectionService.connection.on('GameOver', () => {
          that.boxes.forEach(box => box.locked = true);
          that.turn = false;
        });
        // that.turn = tictactoeService.isTurn;
      }

      tictactoeService.hasWon.subscribe(x => that.hasWon = x);
    });
  }

  changeField(event: Event, tileId: string) {
      if (!this.turn ||
          this.boxes.filter(x => x.id === tileId)[0].locked === true) {
          return;
      }

      this.connectionService.connection.invoke('TileClicked', this.groupName, tileId).then(() => {
        if (this.checkWin()) {
          this.tictactoeService.playerHasWon(this.groupName);
        }
      });

  }

  checkWin() {
    const that = this;

    // check if columns are all on same state
    const columns = this.boxes.filter(x => {

      for (let i = 1; i < 4; i++) {
        return x.id.endsWith(i.toString()) && x.state === that.selfTileState;
      }
      return null;
    });

    const rows = this.boxes.filter(x => {

      for (let i = 1; i < 4; i++) {
        return x.id.endsWith(i.toString()) && x.state === that.selfTileState;
      }
      return null;
    });

    const diagonalLeft = this.boxes.filter(x => {
      for (let i = 1; i < 4; i++) {
        return x.id.startsWith(i.toString()) && x.state === that.selfTileState &&
        x.id.endsWith(i.toString());
      }
    });

    const diagonalRight = this.boxes.filter(x => {
      for (let i = 1; i < 4; i++) {
        return x.id.startsWith(i.toString()) && x.id.endsWith((4 - i).toString())
         && x.state === that.selfTileState;
      }
    });
    return columns.length > 2 || rows.length > 2 || diagonalLeft.length > 2 || diagonalRight.length > 2;
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
    // if (this.turnSubscription == null) {
    //   this.router.navigate(['/']);
    //   return;
    // }
    this.connectionService.connection.off('TileChange');
    this.connectionService.connection.off('SwitchTurn');
    this.tictactoeService.reset();
    if (this.groupName) {
      this.tictactoeService.LeaveGroup(this.groupName);
    }
    this.turnSubscription.unsubscribe();
    this.groupNameSubscription.unsubscribe();

  }
  // tslint:disable-next-line:member-ordering
  public boxes: Box[] = [
    {
        id: '1-1',
        locked: false
    },
    {
        id: '1-2',
        locked: false
    },
    {
        id: '1-3',
        locked: false
    },
    {
        id: '2-1',
        locked: false
    },
    {
        id: '2-2',
        locked: false
    },
    {
        id: '2-3',
        locked: false
    },
    {
        id: '3-1',
        locked: false
    },
    {
        id: '3-2',
        locked: false
    },
    {
        id: '3-3',
        locked: false
    }];
}
