import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Posts } from 'src/app/shared/http/endpoints';
import { ApiService } from 'src/app/shared/http/api.service';
import { PostResponseParams, PostResponse } from 'src/app/shared/http/response';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: false }) container: ElementRef;
  protected slug$: Observable<string>;
  public post: PostResponseParams;

  constructor(private apiService: ApiService, protected route: ActivatedRoute) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.slug$ = this.route.paramMap.pipe(map(params => (params.get('slug'))));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));
  }
  get(slug: string) {
    const filter = 'slug:' + slug;
    const singlePost = new Posts({ filter: filter, include: 'authors,tags' });
    this.apiService.browse<PostResponse>(singlePost).pipe(map(x =>
      x.posts.filter(y => y.primary_author.slug === 'ghost')))
      .subscribe(posts => {
        if (!posts || !posts.length) {
          // array or array.length are falsy
          // ⇒ do not attempt to process array
          // return here or go to main page or 404 or whatever
          throw Error('no post found plx fix');
        }
        this.post = posts[0];
        this.container.nativeElement.innerHTML = this.post.html;
      });
  }
}
