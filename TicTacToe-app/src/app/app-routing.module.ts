import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

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
        path: 'dashboard',
        loadChildren: () =>
          import('./module/home/home.module').then(m => m.HomeModule)
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
  // { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
