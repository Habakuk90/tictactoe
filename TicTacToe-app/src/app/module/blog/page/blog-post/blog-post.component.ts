import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Title } from '@angular/platform-browser';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  public post: IResponse;

  constructor(
    private titleService: Title,
    private ghostService: GhostService,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    // MAGICSTRING see blog.routing.ts
    this.route.paramMap.subscribe(x => {
      return this.get(x.get('slug'));
    });
  }

  get(slug: string) {
    const that = this;

    const options: IBrowseOptions = {
      filter: 'slug:' + slug,
      include: 'authors,tags'
    };
    this.ghostService.getBlogPage(options)
      .subscribe(post => {
        that.post = post;
        that.titleService.setTitle(that.post.title);
      });
  }
}
