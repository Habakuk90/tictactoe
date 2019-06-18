// TODOANDI aufräumen bidde
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
import { GroupService } from './shared/services/group.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { SelectGameComponent } from './home/select-game/select-game.component';
import { SelectPlayerComponent } from './home/select-player/select-player.component';
import { GameModule } from './games/game.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SelectGameComponent,
    SelectPlayerComponent,
    SpinnerComponent,
    TestSiteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    AccountModule,
    SharedModule,
    ModalModule,
    GameModule
  ],
  providers: [
    // TODOANDI: aufrumen bidde
    ConfigService, SpinnerService,
    AuthGuard, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
