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

  public getPage(tag: string, count: number = 1): Observable<IPageResponseParams[]> {
    const params: IBrowseParams = {
      filter: `tag:${tag}`,
      formats: 'html,plaintext'
    };
    const page = new Pages(params);
    return super.browse<IPageResponse>(page)
      .pipe(catchError(super.handleError), take(count), map(response => {
        // if (count > 1 || response.pages.length > 1) {
        //   return response.pages;
        // } else {
        console.log(response);
        return response.pages;
        // }
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
        catchError(super.handleError),
        map((response: IPostResponse) => {
          const posts = response.posts;

          return posts;
        })
      );
  }
}
