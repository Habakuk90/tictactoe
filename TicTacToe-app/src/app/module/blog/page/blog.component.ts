import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Location } from '@angular/common';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  featureImageUrl: string;
  // TODO make use of PostResponse work?
  posts: Array<IResponse> = [];
  @ViewChild('ghosthtml', { static: false }) ghosthtml: ElementRef;
  constructor(private ghostService: GhostService, private location: Location) {
  }

  get() {
    // TODOANDI: extend params for activated route
    const params: IBrowseOptions = {
      include: 'authors',
      limit: 3,
      page: 1
    };

    this.ghostService.getBlogPages(params).subscribe(posts => {
      this.posts = posts;
    });
    const options: IBrowseOptions = {
      filter: `tag:${'styleguide'}`,
      formats: 'html,plaintext'
    };
    this.ghostService.getPage(options).subscribe(pages => {
      const page = pages[0];
      (this.ghosthtml.nativeElement as HTMLElement).outerHTML = page.html;
      this.featureImageUrl = page.feature_image;
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
