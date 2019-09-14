import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Title } from '@angular/platform-browser';
import { IResponse } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: false }) container: ElementRef;
  protected slug$: Observable<string>;
  public post: IResponse;

  constructor(
    private titleService: Title,
    private ghostService: GhostService,
    protected route: ActivatedRoute) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.slug$ = this.route.paramMap.pipe(map(params => (params.get('slug'))));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));
  }
  get(slug: string) {
    const that = this;
    this.ghostService.getBlogPage(slug)
      .subscribe(post => {
        that.post = post;
        that.titleService.setTitle(that.post.title);
        (that.container.nativeElement as HTMLElement).outerHTML = this.post.html;
      });
  }
}
