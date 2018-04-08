import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { GameModalComponent } from './components/gameModal/gameModal.component';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { TicTacToeComponent } from './components/games/tictactoe/tictactoe.component';

@NgModule({
    declarations: [
        AppComponent,
        GameModalComponent,
        GamesComponent,
        HomeComponent,
        TicTacToeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'games', component: GamesComponent },
            //{ path: 'games/tictactoe', component: TicTacToeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
