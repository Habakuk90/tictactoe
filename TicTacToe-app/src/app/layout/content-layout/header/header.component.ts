import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef } from '@angular/core';
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
  constructor(private userService: UserService, private element: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: ScrollEvent) {
    const header = this.element.nativeElement as HTMLElement;

    const headerHeight = header.getBoundingClientRect().height;
    if (event.pageY > headerHeight + 100) {
      header.classList.add('active');
    }
    else {
      header.classList.remove('active');
    }

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


interface ScrollEvent extends Event {
  pageY: number; pageX: number;
}
