import { NgModule } from '@angular/core';
import { BlogComponent } from './page/blog.component';
import { BlogPostComponent } from './page/blog-post/blog-post.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogRoutingModule } from './blog.routing';
import { TagsDetailComponent } from './page/tags-detail/tags-detail.component';
import { BlogTeaserComponent } from './component/blog-teaser/blog-teaser.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
    TagsDetailComponent,
    BlogTeaserComponent
  ],
  imports: [
    SharedModule,

    BlogRoutingModule
  ],
  exports: [],
  providers: [],
})
export class BlogModule { }
