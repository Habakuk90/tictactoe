import { Component, Input } from '@angular/core';
import { ConnectionService } from '../../services/connectionService.service';
import { HubConnection } from '@aspnet/signalr';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tictactoe',
    templateUrl: './tictactoe.component.html',
    styleUrls: ['./tictactoe.component.css'],
})
export class TicTacToeComponent {
    public turn: boolean;
    public boxes: Box[] = [
        {
            id: '1-1',
        },
        {
            id: '1-2',
        },
        {
            id: '1-3',
        },
        {
            id: '2-1',
        },
        {
            id: '2-2',
        },
        {
            id: '2-3',
        },
        {
            id: '3-1',
        },
        {
            id: '3-2',
        },
        {
            id: '3-3',
        }
    ];
    private connection: HubConnection;
    private roomName: string;
    

    constructor(connectionService: ConnectionService, activeRoute: ActivatedRoute) {
        this.connection = connectionService.connection;

        this.roomName = activeRoute.snapshot.queryParams['roomName'];
    }

    ngOnInit() {
        var that = this;
        //that.connection.invoke('DecideTurn', this.roomName);
        that.connection.on('tileChange', function (tileId) {

            if (!that.turn) {
                return;
            }

            let clickedTile = that.boxes.filter(x => x.id === tileId)[0];
            console.log(clickedTile, tileId)
            if (clickedTile.state != null) {
                console.log("Cant be changed");
            }
            if (clickedTile.state === "cross") {
                clickedTile.state = "circle";
            }
            else {
                clickedTile.state = "cross";
            }
        });

        that.connection.on('SwitchTurn', function () {
            debugger;
            console.log('***before*** SetSequence', that.turn);
            that.turn = !that.turn;
            console.log('***after*** SetSequence', that.turn);

        });
    }

    changeField(event: Event, tileId: string) {
        this.connection.invoke('TileClicked', this.roomName);
    }



}

interface Box {
    id: string,
    state?: string,
}