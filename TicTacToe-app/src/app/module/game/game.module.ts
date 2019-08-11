import { NgModule } from '@angular/core';
import { TicTacToeComponent } from './page/tictactoe/tictactoe.component';
import { GameRoutingModule } from './game.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameComponent } from './page/game.component';
import { SelectGameComponent } from './component/select-game/select-game.component';

@NgModule({
  declarations: [
    GameComponent,
    TicTacToeComponent,
    SelectGameComponent,
    // RPSComponent
  ],
  imports: [
    SharedModule,

    GameRoutingModule
  ],
  providers: [],
})

export class GameModule { }
