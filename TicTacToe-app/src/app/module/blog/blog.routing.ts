import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './page/blog.component';
import { BlogPostComponent } from './page/blog-post/blog-post.component';
import { TagsDetailComponent } from './page/tags-detail/tags-detail.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':slug', component: BlogPostComponent },
  { path: 'tags/:slug', component: TagsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
