import { Component, ElementRef, Input } from '@angular/core';
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
    <div [innerHTML]="post.html" class="ghost-html"></div>
  `,
  styleUrls: ['ghost-html-component.scss']
})
export class GhostHtmlComponent {
  @Input() post: IResponse = null;
  constructor() {
  }
}
