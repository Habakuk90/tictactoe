import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { ConnectionService } from '.././services/connectionService.service';
import { Router } from '@angular/router';
@Component({
    selector: 'games',
    templateUrl: './games.component.html'
})


export class GamesComponent {
    private currentUser: string;
    private users: Array<string>;
    private selectedPlayer: string;
    private challengerUser: string;
    private isModalActive: string;
    private games: Array<Game> = [];
    public connection: HubConnection;
    constructor(private connectionService: ConnectionService, private router: Router) {
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
            if (!that.currentUser)
                that.currentUser = currentUser;
            that.users = userOnline;
        });
        this.connection.on('challenged', function (challenger) {
            that.isModalActive = 'challenged';
            that.challengerUser = challenger

        });
        //open waiting for enemy Modal
        this.connection.on('waiting', function () {
            that.isModalActive = 'waiting';
        });

        that.connection.on('GoToGame', function (url, roomName) {
            that.router.navigate([url], { queryParams: { roomName: roomName } });
        });
    }


    challengeEnemy() {
        var that = this;
        that.connection.invoke('Challenge', that.selectedPlayer);
    }


    private selectPlayer(event: Event, user: string) {
        var target = event.target || event.srcElement || event.currentTarget;
        this.selectedPlayer = user;
    }

}


interface Game {
    title: string,
    thumbnailClass: string,
    url: string
}