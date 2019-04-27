import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AccountModule } from './account/account.module';
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
import { GameService } from './shared/services/game.service';
import { RPSComponent } from './rps/rps.component';
import { SelectGameComponent } from './home/select-game/select-game.component';
import { SelectPlayerComponent } from './home/select-player/select-player.component';
import { HomeService } from './home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SelectGameComponent,
    SelectPlayerComponent,
    TicTacToeComponent,
    SpinnerComponent,
    TestSiteComponent,
    RPSComponent
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
    // TODOANDI: aufrumen bidde
    ConfigService, HomeService, SpinnerService,
    TicTacToeService, AuthGuard, GroupService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
