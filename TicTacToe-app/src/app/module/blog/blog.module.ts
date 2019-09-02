import { NgModule } from '@angular/core';
import { BlogComponent } from './page/blog.component';
import { BlogPostComponent } from './page/blog-post/blog-post.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogRoutingModule } from './blog.routing';

@NgModule({
    declarations: [
        BlogComponent,
        BlogPostComponent
    ],
    imports: [
        SharedModule,

        BlogRoutingModule
    ],
    exports: [],
    providers: [],
})
export class BlogModule {}
