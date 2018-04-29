import { Component, Input } from '@angular/core';
import { IGameUser } from '../../models/gameUser.model';

@Component({
    selector: 'games-container',
    templateUrl: './games-container.component.html'
})

export class GamesContainerComponent {
    @Input() enemyUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
    @Input() currentUser: IGameUser = {
        name: '',
        currentConnectionId: ''
    };;
}