import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { IGame } from 'src/app/shared/models/game.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss']
})

export class SelectPlayerComponent implements OnInit {
  @Output() playerSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedGames: Array<IGame>;
  selectedPlayer: string;

  get userOnline(): Array<IUser> {
    return this.userService.userOnline;
  }
  currentUser: string;

  constructor(private userService: UserService) {
      this.currentUser = this.userService.currentUserName;
  }

  enemyClicked(user: string) {
    if (this.selectedPlayer === user) {
      this.selectedPlayer = null;
      user = null;
    } else {
      this.selectedPlayer = user;
    }
    this.playerSelected.emit(user);
  }

  ngOnInit() {
    this.selectedGames = this.selectedGames.filter(x => x.selected);
  }
}
