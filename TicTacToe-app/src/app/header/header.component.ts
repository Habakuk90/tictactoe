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
  navStatusSubscription: Subscription;

  constructor(private userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
  }

  ngOnInit() {
    this.navStatusSubscription = this.userService.authNavStatus$.subscribe(
      navStatus => this.isLoggedIn = navStatus);
  }

  ngOnDestroy() {
    this.navStatusSubscription.unsubscribe();
  }
  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }
}
