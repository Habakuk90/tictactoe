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
  constructor(private userService: UserService, private tictactoeService: TicTacToeService) {

  }

  ngOnInit() {
    this.isLoggedInSubscription = this.userService.isLoggedIn
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    // tslint:disable-next-line:prefer-const
    let that = this;
    this.turnSubscription = this.tictactoeService.isTurn
      .subscribe(isTurn => {
        that.turn = isTurn;
      });
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
  logout() {
    this.userService.logout();
  }

  switch() {
    this.tictactoeService.switchTurn();
  }
}
