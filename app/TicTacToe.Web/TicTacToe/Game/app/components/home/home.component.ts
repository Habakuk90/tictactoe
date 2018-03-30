import { Component } from '@angular/core';
import { GameHubConnection } from "../services/gameHubConnection.service";
import { Router } from "@angular/router";
import { IGameUser } from "../services/gameUser.model";
import { HubConnection } from "@aspnet/signalr/dist/esm";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private games: Array<Game> = [];
    public connection: HubConnection;
    private users: Array<IGameUser>;
    private currentUser: IGameUser = {
        name: '',
        currentConnectionId: '',
    };
    private selectedPlayer: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    private enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    private isModalActive: string;

    constructor(private connectionService: GameHubConnection, private router: Router) {
        this.connection = connectionService.connection;
    }
    ngOnInit() {
        var tictactoeGame: Game = {
            title: 'Tic Tac Toe',
            thumbnailClass: 'tictactoe__thumbnail',
            url: 'games/tictactoe'
        };

        this.games.push(tictactoeGame);
        let that = this;
        this.connection.invoke('GetConnectedUser');
        this.connection.on('SetConnectedUser', function (currentUser, userOnline) {
            if (!that.currentUser || !that.currentUser.name)
                that.currentUser.name = currentUser.name;
            that.users = userOnline;
        });
        this.connection.on('OpenChallengedModal', function (enemyUser, isTurn) {
            that.isModalActive = 'challenged';
            that.enemyUser = enemyUser;


        });
        //open waiting for enemy Modal
        this.connection.on('OpenWaitingModal', function (enemyUser) {
            that.isModalActive = 'waiting';
            that.enemyUser = enemyUser;
        });
        that.connection.on('GoToGame', function (url, roomName, id1, id2) {
            that.router.navigate([url], { queryParams: { roomName: roomName, id1: id1, id2: id2 } });
            that.connectionService.currentUser = that.currentUser;
            that.connectionService.enemyUser = that.enemyUser;
        });
    }

    private selectPlayer(event: Event, user: IGameUser) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.selectedPlayer.name = user.name;
    }

    onChallengeResponse(e: Event) {
        this.connection.invoke('ChallengeResponse', this.enemyUser, e);
    }

    challengePlayer() {
        var that = this;
        that.connection.invoke('ChallengePlayer', that.selectedPlayer);
    }
}
interface Game {
    title: string,
    thumbnailClass: string,
    url: string
}