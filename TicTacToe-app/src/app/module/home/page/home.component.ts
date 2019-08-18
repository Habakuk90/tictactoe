import { Component, OnDestroy, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';
import { IUser } from 'src/app/data/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { PageResponse } from 'src/app/shared/http/response';
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
  ghostPage: Observable<PageResponse>;
  constructor(
    private userService: UserService,
    private ghost: GhostService) {

    // this.userService._HomeStateSubject.subscribe(x => this.selectionState = x);
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
    // evaluate if more socketuris are an option.
    // this.hub.stopConnection();
  }

  registerOnMethods() {
    // this.hub = this.hubService.createConnection('/signalR', 'homehub', HomeHubConnection);


    // that.hub.isConnected.subscribe((isConnected: boolean) => {
    //   if (isConnected) {
    //     that.hub.addCurrentUser(that.userService.currentUserName, that.userService.isAnonymous);
    //     that.registerOnMethods();
    //   }
    // });

    // this.hub.onUpdateUserList((userOnline: Array<IUser>) => {
    //   that.userService.userOnline = userOnline;
    // });

    // this.hub.onStartGame((groupName: string, gameName: string) => {
    //   that.groupService._groupNameSubject.next(groupName);
    //   that.router.navigate(['/' + gameName]);
    // });

    // this.hub.onOpenModal((enemy: string, gameName: string, modalName: string) => {
    //   if (that.selectedGames) {
    //     that.selectedGames.find(x => x.name.toLowerCase() === gameName.toLowerCase()).selected = true;
    //   }

    // const name: Modals = Modals[modalName];
    // const modal: IModal = new Modal(name, { enemyUserName: enemy });
    // that.modalService.openModal(modal);

    // this.hub.challengePlayer(this.selectedPlayer.name, 'tictactoe');

    // });
  }
}



@Component({
  selector: 'ghost-page',
  template: `
    <div #container>

    </div>
  `
})
export class GhostPageComponent implements OnInit {
  @Input() ghostPage: Observable<PageResponse>;

  @ViewChild('container', { static: false }) container: ElementRef;

  ngOnInit() {
    // TODOANDI use the root component to implement innerHTML
    this.ghostPage.subscribe(page => {
      this.container.nativeElement.innerHTML = page.pages[0].html;
    });

  }
}
