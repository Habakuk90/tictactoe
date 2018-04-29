import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { GameHubConnection } from '.././services/gameHubConnection.service';

import { Router } from '@angular/router';
import { IGameUser } from '../models/gameUser.model';
@Component({
    selector: 'games',
    templateUrl: './games.component.html'
})

export class GamesComponent {
    currentUser: IGameUser = {
        name: '',
        currentConnectionId: '',
    };
    enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };
    users: Array<IGameUser> = [];

    constructor(private connectionService: GameHubConnection) {
        this.currentUser = connectionService.currentUser;
        this.enemyUser = connectionService.enemyUser;
    }
}