import { Component, OnDestroy, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';
import { IUser } from 'src/app/data/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { IPageResponseParams } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  isGameSelected = false;
  isPlayerSelected = false;
  selectionState = 0;
  selectedGames: Array<IGame>;
  selectedPlayer: IUser;

  hub: HomeHubConnection;
  ghostPage: Observable<IPageResponseParams>;
  constructor(
    private userService: UserService,
    private ghost: GhostService) {
  }

  selectedGame(game: IGame): IGame {
    return this.selectedGames.filter(x => x === game)[0];
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    const that = this;
    that.ghostPage = this.ghost.getHomePage();
  }

  ngOnDestroy() {
  }

  registerOnMethods() {
  }
}
