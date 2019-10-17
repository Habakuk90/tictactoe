import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Title } from '@angular/platform-browser';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  public page: IResponse;

  constructor(
    private titleService: Title,
    private ghostService: GhostService,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    // MAGICSTRING see blog.routing.ts
    this.route.paramMap.subscribe(x => {
      return this.get(x.get('pageSlug'));
    });
  }

  get(slug: string) {
    const that = this;

    const options: IBrowseOptions = {
      filter: 'slug:' + slug,
      include: 'authors,tags'
    };
    this.ghostService.getPages(options)
      .subscribe(pages => {
        that.page = pages[0];
        that.titleService.setTitle(that.page.title);
      });
  }
}
