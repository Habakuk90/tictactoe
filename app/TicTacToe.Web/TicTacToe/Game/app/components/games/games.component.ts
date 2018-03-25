import { Component, Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { ConnectionService } from '.././services/connectionService.service';
@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    providers: [ConnectionService]
})
export class GamesComponent {
    private currentUser: string;
    private selectedPlayer: string;

    private users: Array<string>;

    public connection: HubConnection;
    ngOnInit() {
        this.connection.start().then(() => {
            let that = this;
            this.connection.invoke('GetConnectedUser');
            this.connection.on('SetConnectedUser', function (currentUser, userOnline) {
                if (!that.currentUser)
                    that.currentUser = currentUser;
                that.users = userOnline;
            });
            this.connection.on('challenged', function (challenger) {
                debugger;
                //that.modals.challengeModal.active = true;
                //$('section.challenge').addClass('active');

            });
            //open waiting for enemy Modal
            this.connection.on('waiting', function () {
                //that.modals.waitingModal.active = true;
                debugger;

                //$('section.challenge').addClass('active');
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


    //games: {
    //    tictactoe: {
    //        title: 'Tic Tac Toe',
    //        thumbnailClass: 'tictactoe__thumbnail',
    //        url: 'games/tictactoe'
    //    }
    //};

        //     that.connection.start()
        //         // Init Get Connected User 
        //         .then(() => {
        //             that.connection
        //                 .invoke('GetConnectedUser');
        //         });

        //     // Sets Connected User by getting list of online User in Hub
        //     that.connection.on('SetConnectedUser', function (userOnline) {
        //         that.userOnline = userOnline;
        //     });
        //     that.connection.on('Challenged', function (challenger) {
        //         that.challenger = challenger;
        //         debugger;
        //         //that.modals.challengeModal.active = true;
        //         $('section.challenge').addClass('active');

        //     });
        //     //open waiting for enemy Modal
        //     that.connection.on('waiting', function () {
        //         //that.modals.waitingModal.active = true;
        //         debugger;

        //         $('section.challenge').addClass('active');
        //     });

        //     // Enemy reacted to your challenge
        //     that.connection.on('Response', function (enemy, action) {
        //         that.modals.waitingModal.waitingMessage = enemy + " has " + action;
        //     });

        //     // Enemy reacted to your challenge
        //     that.connection.on('GoToGame', function (url) {
        //         window.location.href = url;
        //     });
        // },