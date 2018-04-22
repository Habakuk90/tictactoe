import { Component, Input } from '@angular/core';
import { GameHubConnection } from '../../services/gameHubConnection.service';
import { HubConnection } from '@aspnet/signalr';
import { ActivatedRoute } from '@angular/router';
import { IGameUser } from "../../services/gameUser.model";

@Component({
    selector: 'tictactoe',
    templateUrl: './tictactoe.component.html',
    styleUrls: ['./tictactoe.component.css'],
})
export class TicTacToeComponent {
    @Input() enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
    @Input() currentUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
    public turn: boolean = false;
    //enemyUser: IGameUser;
    selfTileState: string = 'circle';
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
    id1: string;
    id2: string;
    private connection: HubConnection;
    private roomName: string;
    gameTile = 'circle';

    constructor(connectionService: GameHubConnection, activeRoute: ActivatedRoute) {
        this.connection = connectionService.connection;
        this.id1 = activeRoute.snapshot.queryParams['id1'];
        this.id2 = activeRoute.snapshot.queryParams['id2'];
        this.roomName = activeRoute.snapshot.queryParams['roomName'];

    }

    ngOnInit() {
        var that = this;
        //that.connection.invoke('DecideTurn', this.roomName);
        that.connection.on('TileChange', function (tileId) {
            that.boxes.filter(x => x.id === tileId)[0].state = that.gameTile;
            that.boxes.filter(x => x.id === tileId)[0].locked = true;
        });

        that.connection.on('SwitchTurn', function () {
            that.turn = !that.turn;
            
            if (that.gameTile === 'circle')
                that.gameTile = 'cross';
            else {
                that.gameTile = 'circle';
            }
        });
        // init()
        this.connection.on('ChallengeAccepted', function (enemy) {
            that.turn = true;
            that.selfTileState = 'cross';
        });
    }

    changeField(event: Event, tileId: string) {
        if (!this.turn || 
            this.boxes.filter(x => x.id === tileId)[0].locked === true)
        {
            return;
        }
        
        this.connection.invoke('TileClicked', this.roomName, this.id1, this.id2, tileId);
    }



}

interface Box {
    id: string,
    state?: string,
    locked: boolean
}