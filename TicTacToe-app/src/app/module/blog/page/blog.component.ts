import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Location } from '@angular/common';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseParams } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  featureImageUrl: string;
  // TODO make use of PostResponse work?
  posts: Array<IResponse> = [];
  @ViewChild('styleguide', { static: false }) container: ElementRef;
  constructor(private ghostService: GhostService, private location: Location) {
  }

  get() {
    // TODOANDI: extend params for activated route
    const params: IBrowseParams = {
      include: 'authors',
      limit: 3,
      page: 1
    };

    this.ghostService.getBlogPages(params).subscribe(posts => {
      this.posts = posts;
    });

    this.ghostService.getPage('styleguide', 1).subscribe(pages => {
      const page = pages[0];
      (this.container.nativeElement as HTMLElement).outerHTML = page.html;
      this.featureImageUrl = page.feature_image;
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
