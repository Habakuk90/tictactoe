import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { TicTacToeService } from '../tictactoe/tictactoe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() userName: string;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;
  turnSubscription: Subscription;
  turn: boolean;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.isLoggedInSubscription = this.userService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
  logout() {
    this.userService.logout();
  }
}
