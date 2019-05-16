import { RPSComponent } from './rps/rps.component';
import { TicTacToeComponent } from './tictactoe/tictactoe.component';
import { NgModule } from '@angular/core';
import { GameService } from './game.service';
import { TicTacToeService } from './tictactoe/tictactoe.service';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    TicTacToeComponent,
    RPSComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    TicTacToeService, GameService
  ],
})

export class GameModule { }
