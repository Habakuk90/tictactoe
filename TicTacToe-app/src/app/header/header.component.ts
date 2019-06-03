import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';

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
  constructor(private userService: UserService) {

  }

  back() {
    this.userService._HomeStateSubject.next(0);
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.userService._isLoggedInSubject
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.homeStateSubscription = this.userService._HomeStateSubject
      .subscribe(x => this.homeState = x);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
  logout() {
    this.userService.logout();
  }
}
