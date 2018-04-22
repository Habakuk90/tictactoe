import { Component } from '@angular/core';
import { GameHubConnection } from "../services/gameHubConnection.service";
import { Router } from "@angular/router";
import { IGameUser } from "../services/gameUser.model";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private games: Array<Game> = [];
    private users: Array<IGameUser> = [];
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
    private isModalActive: string = '';

    constructor(private connectionService: GameHubConnection, private router: Router) {
    }
    ngOnInit() {
        let that = this;
        that.addGames();
        this.connectionService.connection.invoke('GetAllUser')
            .then(userOnline => this.users = userOnline);
        this.connectionService.connection.on('SetConnectedUser', function (currentUser, userOnline) {
            if (!that.currentUser || !that.currentUser.name)
                that.currentUser.name = currentUser.name;
            // [TODO] GetAllOnlineUser no need for SetConnectedUser?
            that.users = userOnline;
        });
        this.connectionService.connection.on('OpenChallengedModal', function (enemyUser) {
            that.isModalActive = 'challenged';
            that.enemyUser = enemyUser;
        });

        //open waiting for enemy Modal
        this.connectionService.connection.on('OpenWaitingModal', function (enemyUser) {
            that.isModalActive = 'waiting';
            that.enemyUser = enemyUser;
        });

        this.connectionService.connection.on('GoToGame', function (url, roomName, id1, id2) {
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
        this.connectionService.connection.invoke('ChallengeResponse', this.enemyUser, e);
    }

    challengePlayer() {
        this.connectionService.connection.invoke('ChallengePlayer', this.selectedPlayer);
    }


    addGames() {
        var tictactoeGame: Game = {
            title: 'Tic Tac Toe',
            thumbnailClass: 'tictactoe__thumbnail',
            url: 'games/tictactoe'
        };
        var rps: Game = {
            title: 'Rock Paper Scissors',
            thumbnailClass: 'rps_thumbnail',
            url: 'games/rps'
        }

        this.games.push(tictactoeGame);
        this.games.push(rps);

    }
}
interface Game {
    title: string,
    thumbnailClass: string,
    url: string
}