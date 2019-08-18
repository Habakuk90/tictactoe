import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PostResponseParams, PostResponse, BrowseParams } from 'src/app/shared/http/response';
import { ApiService } from 'src/app/shared/http/api.service';
import { PostParams, Posts } from 'src/app/shared/http/endpoints';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Array<PostResponseParams> = [];

  constructor(private apiService: ApiService, protected location: Location, private router: Router) {
  }

  get() {
    const that = this;
    // TODOANDI: extend params for activated route
    const p: BrowseParams = {
      include: 'authors',
      limit: 3,
      page: 1
    };

    const x = new Posts(p);
    //TODOANDI implement ghost.service here and move business logic to there
    this.apiService.browse<PostResponse>(x).subscribe(response => {
      this.posts = response.posts;
      this.posts.forEach((element) => {
        element.url = this.location.path() + '/' + element.slug;
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.log('Unknown error occured please try again later');
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
