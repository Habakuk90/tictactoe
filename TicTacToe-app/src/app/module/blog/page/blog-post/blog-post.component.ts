import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
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
  protected slug$: Observable<string>;
  public post: IResponse;
  public dings: Subscription;

  constructor(
    private titleService: Title,
    private ghostService: GhostService,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    this.slug$ = this.route.paramMap.pipe(map(params => (params.get('slug'))));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));
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
