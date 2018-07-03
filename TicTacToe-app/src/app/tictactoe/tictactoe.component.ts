import { Component, OnInit } from '@angular/core';
import { HubConnectionService } from '../shared/services/hubconnection.service';
import { ActivatedRoute } from '@angular/router';
import { HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss']
})
export class TicTacToeComponent {
  connection: HubConnection;
  public turn = true;
  selfTileState = 'circle';
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
      }
  ];
  private roomName: string;
  gameTile = 'circle';

  constructor(connectionService: HubConnectionService, activeRoute: ActivatedRoute) {
    let that = this;
    connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.connection = connectionService.connection;
        this.connection.on('TileChange', function (tileId) {
          debugger;
          that.boxes.filter(x => x.id === tileId)[0].state = that.gameTile;
          that.boxes.filter(x => x.id === tileId)[0].locked = true;
        });
        this.connection.on('SwitchTurn', function () {
          that.turn = !that.turn;
debugger;
          if (that.gameTile === 'circle') {
              that.gameTile = 'cross';
          } else {
              that.gameTile = 'circle';
          }
        });
        this.connection.on('ChallengeAccepted', function (enemy) {
            that.turn = true;
            that.selfTileState = 'cross';
        });
      }
    });
  }

  changeField(event: Event, tileId: string) {
      if (!this.turn ||
          this.boxes.filter(x => x.id === tileId)[0].locked === true) {
          return;
      }

      this.connection.invoke('TileClicked', 'user2User', tileId);
  }



}

interface Box {
  id: string;
  state?: string;
  locked: boolean;
}




