import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { ConnectionService } from '.././services/connectionService.service';
@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    providers: [ConnectionService]
})


export class GamesComponent {
    private currentUser: string;
    private users: Array<string>;
    private selectedPlayer: string; 
    private challengerUser: string;
    private activeModal: string;
    private games: Array<Game> = [];
    public connection: HubConnection;
    ngOnInit() {
        var tictactoeGame: Game = {
            title: 'Tic Tac Toe',
            thumbnailClass: 'tictactoe__thumbnail',
            url: 'games/tictactoe'
        };

        this.games.push(tictactoeGame);

        this.connection.start().then(() => {
            let that = this;
            this.connection.invoke('GetConnectedUser');
            this.connection.on('SetConnectedUser', function (currentUser, userOnline) {
                if (!that.currentUser)
                    that.currentUser = currentUser;
                that.users = userOnline;
            });
            this.connection.on('challenged', function (challenger) {
                that.activeModal = 'challenged';
                that.challengerUser = challenger

            });
            //open waiting for enemy Modal
            this.connection.on('waiting', function () {
                that.activeModal = 'waiting';
            });

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
    constructor(private connectionService: ConnectionService) {
        this.connection = connectionService.getConnection();
    }
}


interface Game {
    title: string,
    thumbnailClass: string,
    url: string
}