import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() userName: string;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;
  homeState: number;
  homeStateSubscription: Subscription;
  constructor(private userService: UserService, private gameService: GameService) {

  }

  back() {
    this.gameService._HomeStateSubject.next(0);
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.userService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.homeStateSubscription = this.gameService._HomeStateSubject
      .subscribe(x => this.homeState = x);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
  logout() {
    this.userService.logout();
  }
}
