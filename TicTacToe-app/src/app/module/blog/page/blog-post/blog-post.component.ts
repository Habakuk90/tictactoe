import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Posts } from 'src/app/shared/http/endpoints';
import { PostResponseParams, PostResponse } from 'src/app/shared/http/response';
import { ApiService } from 'src/app/shared/services/api.service';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: false }) container: ElementRef;
  protected slug$: Observable<string>;
  public post: PostResponseParams;

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
    this.ghostService.getBlogPage(slug)
      .subscribe(posts => {
        if (!posts || !posts.length) {
          // array or array.length are falsy
          // ⇒ do not attempt to process array
          // return here or go to main page or 404 or whatever
          throw Error('no post found plx fix');
        }
        this.post = posts[0];
        this.titleService.setTitle(this.post.title);
        this.container.nativeElement.innerHTML = this.post.html;
      });
  }
}
