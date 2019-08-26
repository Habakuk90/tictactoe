import { NgModule } from '@angular/core';


import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '../../shared/shared.module';
import { SelectPlayerComponent } from './page/select-player/select-player.component';
import { GhostPageComponent } from './page/ghost-page/ghost-page.component';

@NgModule({
    declarations: [
        HomeComponent,
        SelectPlayerComponent,
        GhostPageComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
})
export class HomeModule {}
