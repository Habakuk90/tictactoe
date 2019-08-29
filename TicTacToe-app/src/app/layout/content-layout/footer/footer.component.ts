import { Component, EventEmitter, OnInit, Output, ElementRef, HostListener } from '@angular/core';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() changeTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() footerHeight: EventEmitter<number> = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:resize')
  onResize() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;

    this.footerHeight.emit(nativeElement.getBoundingClientRect().height);
  }

  ngOnInit(): void {
    // this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.changeTheme.emit(checked);
  }
}
