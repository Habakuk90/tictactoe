import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { TestSiteComponent } from './test-site/test-site.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestSiteComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
