import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { Router } from '@angular/router';
import { TicTacToeService } from './tictactoe.service';
import { Subscription } from 'rxjs';
import { Box } from './boxes.interface';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';
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
          this.checkWin();

        });
        connectionService.connection.on('SwitchTurn', () => {
          // that.turn = !that.turn;
          console.log('SwitchTurn');
          tictactoeService.switchTurn();
          // that.gameTile = 'circle' ? 'cross' : 'circle';
          if (that.gameTile === 'circle') {
            that.gameTile = 'cross';
          } else {
            that.gameTile = 'circle';
          }
        });
        // that.turn = tictactoeService.isTurn;
      }
    });
  }

  changeField(event: Event, tileId: string) {
      if (!this.turn ||
          this.boxes.filter(x => x.id === tileId)[0].locked === true) {
          return;
      }

      this.connectionService.connection.invoke('TileClicked', this.groupName, tileId);
  }

  checkWin() {
    // tslint:disable-next-line:prefer-const
    let multi = [];
    let row1: Box[] = [];
    let row2: Box[] = [];
    let row3: Box[] = [];

    let hasWon = false;

    this.boxes.forEach(box => {
      if (box.id.startsWith('1')) {
        row1.push(box);
      } else if (box.id.startsWith('2')) {
        row2.push(box);
      } else {
        row3.push(box);
      }
    });
    multi.push(row1);
    multi.push(row2);
    multi.push(row3);

    for (let i = 0; i < 3; i++) {

      if (multi[0][i].locked  && multi[1][i].locked && multi[2][i].locked) {
        this.winningTile = multi[0][i].state;
        console.log('column' + i + 'has won', multi[0][i].state);
      } else if (multi[i][0].locked && multi[i][1].locked && multi[i][2].locked) {
        this.winningTile = multi[0][i];
        console.log('row', i, 'has won');
      } else if (multi[0][0].locked && multi[1][1].locked && multi[2][2].locked) {
        this.winningTile = multi[0][i];
        console.log('diagonal left to right has won');

      } else if (multi[2][0].locked && multi[2][2].locked && multi[0][2].locked) {
        this.winningTile = multi[0][i];
        console.log('diagonal right to left has won');
      }
    }
    this.hasWon = this.winningTile === this.selfTileState;
  }

  ngOnInit() {
    const that = this;
    this.groupNameSubscription = this.tictactoeService.groupName
      .subscribe(groupName => {
        this.groupName = groupName;
        console.log(that.groupName, 'groupName');
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
    this.tictactoeService.LeaveGroup(this.groupName);
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
