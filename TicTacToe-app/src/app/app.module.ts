import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AccountModule } from './account/account.module';
import { HubConnectionService } from './shared/services/hubconnection.service';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuard } from './auth.guard';
import { TestSiteComponent } from './test-site/test-site.component';
import { SharedModule } from './shared/modules/shared.module';
import { ModalModule } from './shared/modals/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TestSiteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    AccountModule,
    SharedModule,
    ModalModule
  ],
  providers: [ConfigService, HubConnectionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
