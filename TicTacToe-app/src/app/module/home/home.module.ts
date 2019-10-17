import { NgModule } from '@angular/core';


import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '../../shared/shared.module';
import { SelectPlayerComponent } from './page/select-player/select-player.component';
import { BlogPageComponent } from '../blog/page/blog-page/blog-page.component';

@NgModule({
    declarations: [
        HomeComponent,
        SelectPlayerComponent,
        BlogPageComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
})
export class HomeModule {}
