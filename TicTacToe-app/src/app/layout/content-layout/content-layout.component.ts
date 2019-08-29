import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  setBodyHeight(footerHeight) {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const container: HTMLElement = nativeElement.querySelector('.container');
    container.style.paddingBottom = footerHeight + 'px';
  }

  ngOnInit() {

  }
}
