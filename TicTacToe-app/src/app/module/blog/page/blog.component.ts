import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GhostService } from 'src/app/shared/services/ghost.service';
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
  constructor(private ghostService: GhostService) {
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
  }

  ngOnInit(): void {
    this.get();
  }
}
