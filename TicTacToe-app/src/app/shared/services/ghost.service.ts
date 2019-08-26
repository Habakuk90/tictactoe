import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseParams, PageResponse } from 'src/app/shared/http/response';
import { Pages } from '../http/endpoints';
import { take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { IGhostElement } from 'src/app/module/home/page/home.component';
import { parse } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GhostService {
  homePage: PageResponse;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

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
      formats: 'html,plaintext,mobiledoc'
    };

    const homePage = new Pages(browseParams);
    return this.apiService.browse<PageResponse>(homePage).pipe(take(1));
  }
}
