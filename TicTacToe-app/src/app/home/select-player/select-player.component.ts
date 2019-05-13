import {Component, Input, OnDestroy, Output, EventEmitter, OnInit} from '@angular/core';
import { IGame } from 'src/app/shared/models/game.interface';
import { HomeService } from '../home.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.scss']
})

export class SelectPlayerComponent implements OnDestroy, OnInit {
  @Output() playerSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedGames: Array<IGame>;
  selectedPlayer: string;

  userOnline: Array<string>;
  currentUser: string;

  constructor(private userService: UserService) {
      this.currentUser = this.userService.currentUserName;
      this.userOnline = this.userService.userOnline;
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

  ngOnDestroy() {
    // TODO are 'off listeners needed here?
  }
}
