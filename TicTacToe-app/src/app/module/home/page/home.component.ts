import { Component, OnDestroy, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IGame } from 'src/app/data/game.interface';
import { IUser } from 'src/app/data/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { PageResponse, PagesResponeParams } from 'src/app/shared/http/response';
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
  ghostPage: Observable<PagesResponeParams>;
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

// class GhostDOMParser extends DOMParser {
//   constructor(private html: string) {
//     super();
//   }
// }

abstract class GhostElement {
  abstract beginstring: string;
  abstract endstring: string;

  constructor() {

  }
}

export interface IGhostElement {
  html: Document;
}

// class GhostElementFactory {
//   private elements: IGhostElement[];
//   private readonly _html: string;


//   constructor(private document: Document) {
//     this.elements = this.getElements(document);
//   }

//   createElements(element: IGhostElement) {
//     this.getElement(this.document.querySelector('body').innerHTML, element);

//     return this.document.querySelectorAll(':not(body):not(html):not(head)');
//   }

//   getAll<T extends IGhostElement>(): GhostImageElement[] {
//     const imageFigues: GhostImageElement[] = [];



//     return imageFigues;
//   }

//   getImage() {

//   }

//   createByString() {

//   }

//   private getElement(html: string, element: IGhostElement) {
//     const beginOf = html.indexOf(element.beginstring);
//     const endOf = html.indexOf(element.endstring);
//     html = html.substring(beginOf + element.beginstring.length, endOf);

//     const parser = new DOMParser();
//     element.html = parser.parseFromString(html, 'text/html');

//     console.log(element);

//     return element;
//   }

//   createElement() {

//   }
//   private getElements(document: Document): IGhostElement[] {
//     let first: number = this.document.querySelector('body').innerHTML.indexOf('<!--kg-card-begin: ') + '<!--kg-card-begin: '.length;

//     let element: IGhostElement = new GhostElement();

//     // let elements: I = new DOMParser().parseFromString(this.document.querySelector('body').innerHTML, 'text/html');

//     return elements;
//   }
// }


// class GhostElement implements IGhostElement {
//   private beginstring: string;
//   private endstring: string;
//   private html: Document;

//   constructor(document: Document) {
//     this
//   }
// }

// class GhostImageElement extends GhostElement {
//   private beginstring = '<!--kg-card-begin: image-->';
//   private endstring = '<!--kg-card-end: image-->';
// }
// }
