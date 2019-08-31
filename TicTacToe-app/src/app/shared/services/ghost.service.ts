import { Injectable } from '@angular/core';
import { IBrowseParams, IPostResponseParams, IPageResponseParams, IPageResponse, IPostResponse } from 'src/app/shared/http/response';
import { Pages, Posts } from '../http/endpoints';
import { take, map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GhostService extends ApiService {
  homePage: IPageResponse;
  constructor(public http: HttpClient) {
    super(http);
   }

  public getHomePage(): Observable<IPageResponseParams> {
    const params: IBrowseParams = {
      filter: 'tag:home',
      formats: 'html,plaintext'
    };

    const homePage = new Pages(params);
    return super.browse<IPageResponse>(homePage).pipe(take(1), map(response => {
      return response.pages[0];
    }));
  }

  public getBlogPage(slug: string): Observable<IPostResponseParams> {
    const filter = 'slug:' + slug;
    const singlePost = new Posts({ filter: filter, include: 'authors,tags' });
    return super.browse<IPostResponse>(singlePost)
      .pipe(map(response => {
        const posts = response.posts;

        if (!posts || !posts.length) {
          // array or array.length are falsy
          // ⇒ do not attempt to process array
          // return here or go to main page or 404 or whatever
          throw Error('no post found plx fix');
        }
        console.log(posts[0]);
        return posts[0];
      }));
  }

  public getBlogPages(params: IBrowseParams): Observable<IPostResponseParams[]> {
    const postEndpoint = new Posts(params);

    return super.browse<IPostResponse>(postEndpoint)
      .pipe(
        catchError(super.handleError.bind(this, ['hi'])),
        map((response: IPostResponse) => {
          const posts = response.posts;

          return posts;
        })
      );
  }
}
