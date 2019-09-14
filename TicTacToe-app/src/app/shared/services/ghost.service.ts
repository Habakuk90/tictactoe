import { Injectable } from '@angular/core';
import { PagesEndpoint, PostsEndpoint, SettingsEndpoint, TagsEndpoint } from '../http/endpoints';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISettingsResponseParams, IResponse, ITagsResponseParams } from '../http/responseParams';
import { IPageResponse, IPostResponse, ISettingsResponse, ITagResponse } from '../http/response';
import { IBrowseParams } from '../http/browseParams';
import { environment } from 'src/environments/environment.docker';

@Injectable({
  providedIn: 'root'
})
export class GhostService extends ApiService {
  constructor(public http: HttpClient) {
    super(http);
  }

  public getPage(tag: string, count: number = 1): Observable<IResponse[]> {
    const params: IBrowseParams = {
      filter: `tag:${tag}`,
      formats: 'html,plaintext'
    };

    const page = new PagesEndpoint(params);

    return super.browse<IPageResponse>(page, count)
      .pipe(
        map(response => {
          return response.pages;
        })
      );
  }

  public getBlogPage(slug: string): Observable<IResponse> {
    const params: IBrowseParams = {
      filter: 'slug:' + slug,
      include: 'authors,tags'
    };

    const singlePost = new PostsEndpoint(params);

    return super.browse<IPostResponse>(singlePost)
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

  public getBlogPages(params: IBrowseParams, count: number = 1): Observable<IResponse[]> {
    const postEndpoint = new PostsEndpoint(params);

    return super.browse<IPostResponse>(postEndpoint, count)
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
    return super.browse<ISettingsResponse>(new SettingsEndpoint())
      .pipe((
        map((response: ISettingsResponse) => {
          return response.settings;
        })
      ));
  }

  public getTags(params: IBrowseParams): Observable<ITagsResponseParams[]> {
    const tagEndpoint = new TagsEndpoint(params);

    return super.browse<ITagResponse>(tagEndpoint)
      .pipe(
        map(response => {
          console.log(response);
          return response.tags;
        })
      );
  }

  private replaceBaseUrl(element: IResponse, replaceWith: string) {
    const baseUrl = environment.ghost.baseUrl;

    return element.url.replace(baseUrl, replaceWith);
  }
}
