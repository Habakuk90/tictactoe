import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() userName: string;
  isLoggedIn: boolean;
  homeState: number;
  homeStateSubscription: Subscription;
  constructor(private userService: UserService) {}

  back() {
  }

  get isAnonymous(): boolean {
    return this.userService.isAnonymous;
  }

  ngOnInit() {
    this.userService._isLoggedInSubject
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy() {
  }

  logout() {
    this.userService.logout();
  }
}
