import { Component, OnInit, Input, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { INavigation } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() navigation: INavigation[];
  isLoggedIn: boolean;

  constructor(private userService: UserService, private element: ElementRef) {}

  // FIXME: this just doesnt work well with little content.
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: ScrollEvent) {
  //   const header = this.element.nativeElement as HTMLElement;
  //   const document = event.target as HTMLDocument;

  //   this.toggleHeader(header, event.pageY, document);
  // }

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

  private toggleHeader(header: HTMLElement, scrollY: number, window: HTMLDocument) {
    const height = header.getBoundingClientRect().height;
    if (scrollY > height + 100 || window.querySelector('body').getBoundingClientRect().height < 200) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }
}


interface ScrollEvent extends Event {
  pageY: number; pageX: number;
}
