import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { Router } from '@angular/router';
import { HubConnection } from '@aspnet/signalr';
import { TicTacToeService } from './tictactoe.service';
import { Subscription } from 'rxjs';
import { Box } from './boxes.interface';
@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {
  connection: HubConnection;
  public turn: boolean;
  selfTileState = 'circle';
  private groupName: string;
  gameTile = 'circle';

  turnSubscription: Subscription;
  groupNameSubscription: Subscription;
  isTurn: any;

  constructor(connectionService: HubConnectionService, private router: Router,
            private tictactoeService: TicTacToeService) {

    const that = this;
    connectionService.isConnected.subscribe(isConnected => {
      that.turn = false;
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('TileChange', (tileId) => {
          that.boxes.filter(x => x.id === tileId)[0].state = that.gameTile;
          that.boxes.filter(x => x.id === tileId)[0].locked = true;
        });
        this.connection.on('SwitchTurn', () => {
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
      // TODO Get right groupName vielleicht auslagern
      this.connection.invoke('TileClicked', this.groupName, tileId);
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
        that.selfTileState = that.turn ? 'cross' : 'circle';

      });


  }

  ngOnDestroy() {
    if (this.turnSubscription == null) {
      this.router.navigate(['/']);
      return;
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
