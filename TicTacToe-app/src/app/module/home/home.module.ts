import { NgModule } from '@angular/core';


import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '../../shared/shared.module';
import { SelectGameComponent } from './page/select-game/select-game.component';
import { SelectPlayerComponent } from './page/select-player/select-player.component';

@NgModule({
    declarations: [
        HomeComponent,
        SelectGameComponent,
        SelectPlayerComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
})
export class HomeModule {}
