import { Component, OnInit } from '@angular/core';
import { PostResponseParams, BrowseParams } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Array<PostResponseParams> = [];

  constructor(private ghostService: GhostService) {
  }

  get() {
    // TODOANDI: extend params for activated route
    const params: BrowseParams = {
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
