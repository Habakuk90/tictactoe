import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeComponent } from './page/tictactoe/tictactoe.component';
import { GameComponent } from './page/game.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'tictactoe',
        component: TicTacToeComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
