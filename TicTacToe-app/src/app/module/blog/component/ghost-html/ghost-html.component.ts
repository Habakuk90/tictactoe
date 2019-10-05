import { Component, ElementRef, Input, OnInit, DoCheck } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';
import { parse } from 'querystring';


@Component({
  selector: 'app-ghost-html',
  template: `
  <div *ngIf="post?.title" class="ghost-html__title">
    <h1>{{post?.title}}</h1>
  </div>
  <div *ngIf="post?.feature_image" class="ghost-html__image l-outbreak">
        <img class="a-image" [src]="post?.feature_image" alt="">
    </div>
    <div [innerHTML]="post?.html" class="ghost-html"></div>
  `,
  styleUrls: ['ghost-html.component.scss']
})
export class GhostHtmlComponent implements DoCheck {
  @Input() post: IResponse = null;
  constructor() {
  }

  ngDoCheck() {
    if (this.post != null && this.post.html) {
      const parser = new DOMParser();
      let array: NodeListOf<ChildNode>;
      const document = parser.parseFromString(this.post.html, 'text/html');
      array = document.querySelector('body').childNodes;
      array.forEach(x => console.log(x));
    }
  }
}
