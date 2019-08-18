import { NgModule } from '@angular/core';


import { HomeComponent, GhostPageComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '../../shared/shared.module';
import { SelectPlayerComponent } from './page/select-player/select-player.component';

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
