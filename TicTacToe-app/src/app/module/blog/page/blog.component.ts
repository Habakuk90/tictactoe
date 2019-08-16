import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PostResponseParams, PostResponse } from 'src/app/shared/http/response';
import { ApiService } from 'src/app/shared/http/api.service';
import { PostParams, Posts } from 'src/app/shared/http/endpoints';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Array<PostResponseParams> = [];

  constructor(private apiService: ApiService, protected location: Location) {
  }

  get() {
    const that = this;
    const p: PostParams = {
      include: 'authors',
      limit: 3
    };

    const x = new Posts(p);

    this.apiService.browse<PostResponse>(x).subscribe(response => {
      this.posts = response.posts;
      this.posts.forEach((element) => {
        element.url = this.location.path() + '/' + element.slug;
      });
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
