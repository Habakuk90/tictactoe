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
import { TicTacToeComponent } from './tictactoe/tictactoe.component';
import { TicTacToeService } from './tictactoe/tictactoe.service';
import { GroupService } from './shared/services/group.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TicTacToeComponent,
    SpinnerComponent,
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
  providers: [
    ConfigService, HubConnectionService, SpinnerService,
    TicTacToeService, AuthGuard, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
