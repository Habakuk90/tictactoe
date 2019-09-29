import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';
import { IResponse } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-tags-detail',
  templateUrl: './tags-detail.component.html',
  styleUrls: ['./tags-detail.component.scss']
})

export class TagsDetailComponent implements OnInit {
  public posts: IResponse[];

  constructor(
    private ghostService: GhostService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(x => {
      return this.get(x.get('tagSlug'));
    });
  }

  get(slug: string) {
    const that = this;
    const params: IBrowseOptions = {
      include: 'tags',
    };
    // console.log(slug);
    this.ghostService.getBlogPages(params)
      .subscribe(posts => {
        that.posts = posts.filter(x => x.tags.find(y => y.slug === slug));
      });
  }
}
