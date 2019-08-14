import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/content-layout/header/header.component';
import { FooterComponent } from './layout/content-layout/footer/footer.component';
import { PageNotFoundComponent } from './layout/content-layout/page-not-found/page-not-found.component';
import { ModalModule } from './shared/modals/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    AppRoutingModule,
    ModalModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
