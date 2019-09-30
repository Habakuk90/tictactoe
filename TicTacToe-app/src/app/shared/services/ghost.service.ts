import { Injectable } from '@angular/core';
import { PagesEndpoint, PostsEndpoint, SettingsEndpoint, TagsEndpoint } from '../http/endpoints';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISettingsResponseParams, IResponse, ITagsResponseParams } from '../http/responseParams';
import { IPageResponse, IPostResponse, ISettingsResponse, ITagResponse } from '../http/response';
import { IBrowseOptions } from '../http/browseParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GhostService extends ApiService {
  constructor(public http: HttpClient) {
    super(http);
  }

  public getPage(options: IBrowseOptions): Observable<IResponse[]> {
    const endpoint = new PagesEndpoint(options);

    return super.browse<IPageResponse>(endpoint)
      .pipe(
        map(response => {
          return response.pages;
        })
      );
  }

  public getBlogPage(options: IBrowseOptions): Observable<IResponse> {
    const endpoint = new PostsEndpoint(options);

    return super.browse<IPostResponse>(endpoint)
      .pipe(
        map(response => {
          const posts = response.posts;
          if (!posts || !posts.length) {
            // array or array.length are falsy
            // ⇒ do not attempt to process array
            // return here or go to main page or 404 or whatever
            throw Error('no post found plx fix');
          }
          return posts[0];
        }));
  }

  public getBlogPages(options: IBrowseOptions): Observable<IResponse[]> {
    const endpoint = new PostsEndpoint(options);

    return super.browse<IPostResponse>(endpoint)
      .pipe(
        map((response: IPostResponse) => {
          const posts = response.posts;

          posts.forEach(element => {
            element.url = this.replaceBaseUrl(element, '/blog/');
          });
          return posts;
        })
      );
  }

  public getSettings(): Observable<ISettingsResponseParams> {
    const endpoint = new SettingsEndpoint();

    return super.browse<ISettingsResponse>(endpoint)
      .pipe((
        map((response: ISettingsResponse) => {
          return response.settings;
        })
      ));
  }

  public getTags(options: IBrowseOptions): Observable<ITagsResponseParams[]> {
    const endpoint = new TagsEndpoint(options);

    return super.browse<ITagResponse>(endpoint)
      .pipe(
        map(response => {
          return response.tags;
        })
      );
  }

  private replaceBaseUrl(element: IResponse, replaceWith: string) {
    const baseUrl = environment.ghost.baseUrl;
    return element.url.replace(baseUrl, replaceWith);
  }
}
