import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseParams, PageResponse, PostResponse } from 'src/app/shared/http/response';
import { Pages, Posts } from '../http/endpoints';
import { take, map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { IGhostElement } from 'src/app/module/home/page/home.component';
import { parse } from 'querystring';
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
    const that = this;
    const paramMap = this.route.snapshot.paramMap;
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
    return this.apiService.browse<PostResponse>(singlePost).pipe(map(x =>
      x.posts.filter(y => y.primary_author.slug === 'ghost')));
  }

  public getBlogPages(params: BrowseParams) {
    const posts = new Posts(params);

    return this.apiService.browse<PostResponse>(posts).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.log('Unknown error occured please try again later');
        this.router.navigate(['']);
        return new Observable<HttpErrorResponse>();
      }
    }));
  }
}
