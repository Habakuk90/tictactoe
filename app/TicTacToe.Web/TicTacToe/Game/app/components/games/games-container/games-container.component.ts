import { Component, Input } from '@angular/core';
import { IGameUser } from "../../services/gameUser.model";

@Component({
    selector: 'games-container',
    templateUrl: './games-container.component.html'
})

export class GamesContainerComponent {
    @Input() enemyUser: IGameUser;
    @Input() currentUser: IGameUser;
}