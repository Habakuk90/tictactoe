import { Component, OnInit } from '@angular/core';
import { IPostResponseParams, IBrowseParams } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  posts: Array<IPostResponseParams> = [];

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
      // add correct url to each element
      posts.forEach((element) => {
        element.url = this.location.path() + '/' + element.slug;
      });

      this.posts = posts;
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
