import { Component, Input } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';


@Component({
  selector: 'app-blog-teaser',
  templateUrl: 'blog-teaser.component.html',
  styleUrls: ['blog-teaser.component.scss']
})
export class BlogTeaserComponent {
  @Input() teaser: IResponse[] = null;
  constructor() {
  }
}
