import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseParams, PageResponse } from 'src/app/shared/http/response';
import { Pages } from '../http/endpoints';
import { take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { IGhostElement } from 'src/app/module/home/page/home.component';
import { parse } from 'querystring';

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
      filter: 'tag:test',
      formats: 'html,plaintext,mobiledoc'
    };

    const homePage = new Pages(browseParams);
    return this.apiService.browse<PageResponse>(homePage).pipe(take(1))
  }

  public getPageElements(html: string): IGhostElement[] {
    let element: IGhostElement[];
    let factory: GhostElementFactory = new GhostElementFactory();

    const element2 = factory.createFromHtml(html);
    return element;
  }
}


class GhostElementFactory {
  constructor() {

  }

  createFromHtml(html: string): NodeListOf<ChildNode> {
    // let start: number = html.indexOf('<!--kg-card-begin: html-->');
    // let end: number = html.indexOf('<!--kg-card-end: html-->');
    let parser = new DOMParser();
    let parsed = parser.parseFromString(html, 'text/html');

    let body = parsed.querySelector('body');

    body.childNodes.forEach(x => {
      console.log(x);
    });
    return body.childNodes;
  }

  createGhostElements() {

  }
}
