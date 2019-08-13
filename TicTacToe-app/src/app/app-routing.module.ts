import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PageNotFoundComponent } from './layout/content-layout/page-not-found/page-not-found.component';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'tictactoe', component: TicTacToeComponent, canActivate: [AuthGuard] },
//   { path: 'rps', component: RPSComponent },
//   { path: 'test', component: TestSiteComponent }
// ];
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./module/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'game',
        loadChildren: () =>
          import('./module/game/game.module').then(m => m.GameModule)
      }
    ]
  },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./module/auth/auth.module').then(m => m.AuthModule)
  // },
  // Fallback when no prior routes is matched
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);