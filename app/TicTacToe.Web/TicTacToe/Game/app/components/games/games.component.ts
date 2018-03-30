import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { GameHubConnection } from '.././services/gameHubConnection.service';

import { Router } from '@angular/router';
import { IGameUser } from '../services/gameUser.model';
@Component({
    selector: 'games',
    templateUrl: './games.component.html'
})

export class GamesComponent {
    private currentUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    private users: Array<string>;
    private selectedPlayer: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    private enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    private isModalActive: string;
    private games: Array<Game> = [];
    public connection: HubConnection;
    constructor(private connectionService: GameHubConnection, private router: Router) {
        this.connection = connectionService.connection;

        this.isModalActive = '';
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
        this.connection.on('OpenChallengedModal', function (enemyUser) {
            that.isModalActive = 'challenged';
            that.enemyUser = enemyUser;
        });
        //open waiting for enemy Modal
        this.connection.on('OpenWaitingModal', function () {
            that.isModalActive = 'waiting';
        });

        that.connection.on('GoToGame', function (url, roomName) {
            that.router.navigate([url], { queryParams: { roomName: roomName } });
        });
    }


    challengePlayer() {
        var that = this;
        that.connection.invoke('ChallengePlayer', that.selectedPlayer);
    }


    private selectPlayer(event: Event, user: IGameUser) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.selectedPlayer.name = user.name;
    }

}


interface Game {
    title: string,
    thumbnailClass: string,
    url: string
}