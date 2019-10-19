import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home.component';
import { BlogPageComponent } from '../blog/page/blog-page/blog-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: ':pageSlug', component: BlogPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
