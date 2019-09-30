import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';


@Component({
  selector: 'app-ghost-html',
  template: `
    <div *ngIf="post?.feature_image" class="ghost-html__image l-outbreak">
        <img class="a-image" [src]="post?.feature_image" alt="">
    </div>
    <div *ngIf="post?.title" class="ghost-html__title">
      <h2>{{post?.title}}</h2>
    </div>
    <div #ghosthtml class="ghost-html"></div>
  `,
  styleUrls: ['ghost-html-component.scss']
})
export class GhostHtmlComponent implements AfterViewChecked {
  @Input() post: IResponse = null;
  @ViewChild('ghosthtml', { static: true }) ghosthtml: ElementRef;
  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked() {
    const ghostContainer = this.ghosthtml.nativeElement as HTMLElement;
    ghostContainer.innerHTML = this.post ? this.post.html : 'loading';
  }
}
