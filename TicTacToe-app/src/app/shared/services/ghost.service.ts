import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseParams, PageResponse, PostResponse, PagesResponeParams } from 'src/app/shared/http/response';
import { Pages, Posts } from '../http/endpoints';
import { take, map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GhostService extends ApiService {
  homePage: PageResponse;
  constructor(public http: HttpClient, private route: ActivatedRoute) {
    super(http);
   }

  /**
   * get any page by given parameters
   */
  public getPage() {
  }

  public getHomePage(): Observable<PagesResponeParams> {
    const browseParams: BrowseParams = {
      filter: 'tag:home',
      formats: 'html,plaintext'
    };

    const homePage = new Pages(browseParams);
    return super.browse<PageResponse>(homePage).pipe(take(1), map(response => {
      return response.pages[0];
    }));
  }

  public getBlogPage(slug: string) {
    const filter = 'slug:' + slug;
    const singlePost = new Posts({ filter: filter, include: 'authors,tags' });
    return super.browse<PostResponse>(singlePost)
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

    return super.browse<PostResponse>(postEndpoint)
      .pipe(
        catchError(super.handleError.bind(this, ['hi'])),
        map((response: PostResponse) => {
          const posts = response.posts;
          posts.forEach((element) => {
            element.url = this.route.snapshot.url + '/' + element.slug;
          });

          return posts;
        })
      );
  }
}
