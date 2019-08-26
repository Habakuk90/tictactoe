import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PostResponseParams, PostResponse, BrowseParams } from 'src/app/shared/http/response';
import { PostParams, Posts } from 'src/app/shared/http/endpoints';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { GhostService } from 'src/app/shared/services/ghost.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Array<PostResponseParams> = [];

  constructor(private ghostService: GhostService, protected location: Location, private router: Router) {
  }

  get() {
    const that = this;
    // TODOANDI: extend params for activated route
    const params: BrowseParams = {
      include: 'authors',
      limit: 3,
      page: 1
    };

    // TODOANDI implement ghost.service here and move business logic to there
    this.ghostService.getBlogPages(params).subscribe((response: PostResponse) => {
      this.posts = response.posts;
      this.posts.forEach((element) => {
        element.url = this.location.path() + '/' + element.slug;
      });
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
