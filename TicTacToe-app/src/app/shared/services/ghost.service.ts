import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseParams, PageResponse } from 'src/app/shared/http/response';
import { ApiService } from '../http/api.service';
import { Pages } from '../http/endpoints';
import { take } from 'rxjs/operators';

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

  public getHomePage() {
    const browseParams: BrowseParams = {
      filter: 'tag:home'
    };

    const homePage = new Pages(browseParams);
    return this.apiService.browse<PageResponse>(homePage).pipe(take(1));
  }
}
