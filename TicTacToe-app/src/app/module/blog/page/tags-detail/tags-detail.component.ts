import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { map, take } from 'rxjs/operators';
import { IBrowseParams } from 'src/app/shared/http/browseParams';
import { IResponse } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-tags-detail',
  templateUrl: './tags-detail.component.html',
  styleUrls: ['./tags-detail.component.scss']
})

export class TagsDetailComponent implements AfterViewInit {
  private slug$: Observable<string>;
  public posts: IResponse[];

  constructor(
    private ghostService: GhostService,
    private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.slug$ = this.route.paramMap.pipe(map(params => params.get('slug')));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));
  }

  get(slug: string) {
    const that = this;
    const params: IBrowseParams = {
      include: 'tags',
    };

    this.ghostService.getBlogPages(params)
      .subscribe(posts => {
        that.posts = posts.filter(x => x.tags.find(y => y.slug === slug));
      });
  }
}
