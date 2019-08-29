import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseParams, PageResponse, PostResponse } from 'src/app/shared/http/response';
import { Pages, Posts } from '../http/endpoints';
import { take, map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GhostService {
  homePage: PageResponse;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  /**
   * get any page by given parameters
   */
  public getPage() {
  }

  public getHomePage(): Observable<PageResponse> {
    const browseParams: BrowseParams = {
      filter: 'tag:home',
      formats: 'html,plaintext'
    };

    const homePage = new Pages(browseParams);
    return this.apiService.browse<PageResponse>(homePage).pipe(take(1));
  }

  public getBlogPage(slug: string) {
    const filter = 'slug:' + slug;
    const singlePost = new Posts({ filter: filter, include: 'authors,tags' });
    return this.apiService.browse<PostResponse>(singlePost)
      .pipe(map(response => {
        const posts = response.posts;

        if (!posts || !posts.length) {
          // array or array.length are falsy
          // ⇒ do not attempt to process array
          // return here or go to main page or 404 or whatever
          throw Error('no post found plx fix');
        }

        return response.posts[0];
      }));
  }

  public getBlogPages(params: BrowseParams) {
    const postEndpoint = new Posts(params);

    return this.apiService.browse<PostResponse>(postEndpoint)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            console.log('Unknown error occured please try again later');
            this.router.navigate(['']);
            return new Observable<HttpErrorResponse>();
          }
        }),
        map((response: PostResponse) => {
          const posts = response.posts;
          posts.forEach((element) => {
            element.url = this.route.url + '/' + element.slug;
          });

          return posts;
        })
      );
  }
}
