import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { INavigation, ITagsResponseParams } from 'src/app/shared/http/responseParams';

interface ScrollEvent extends Event {
  pageY: number; pageX: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() navigation: INavigation[];
  @Input() tags: ITagsResponseParams[];
  isLoggedIn: boolean;
  isOpened: boolean;
  public isMobile: boolean;
  constructor(private userService: UserService, private element: ElementRef) { }

  // FIXME: this just doesnt work well with little content.
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const document = event.target as Window;
    this.toggleMobile = document.innerWidth < 1200;
  }

  public set toggleMobile(value: boolean) {
    this.isMobile = value;
  }

  public get toggleMobile() {
    return this.isMobile;
  }

  get isAnonymous(): boolean {
    return this.userService.isAnonymous;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 1200;

    this.userService._isLoggedInSubject
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy() {
  }

  logout() {
    this.userService.logout();
  }
}
