import { RPSComponent } from './rps/rps.component';
import { TicTacToeComponent } from './tictactoe/tictactoe.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    TicTacToeComponent,
    RPSComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
})

export class GameModule { }
