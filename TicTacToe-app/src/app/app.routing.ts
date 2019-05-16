import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { TestSiteComponent } from './test-site/test-site.component';
import { TicTacToeComponent } from './games/tictactoe/tictactoe.component';
import { RPSComponent } from './games/rps/rps.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tictactoe', component: TicTacToeComponent, canActivate: [AuthGuard] },
  { path: 'rps', component: RPSComponent },
  { path: 'test', component: TestSiteComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
