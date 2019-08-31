import { Component, OnInit } from '@angular/core';
import { IPostResponseParams, IBrowseParams } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Array<IPostResponseParams> = [];

  constructor(private ghostService: GhostService, private route: ActivatedRoute) {
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
        element.url = this.route.snapshot.url + '/' + element.slug;
      });

      this.posts = posts;
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
