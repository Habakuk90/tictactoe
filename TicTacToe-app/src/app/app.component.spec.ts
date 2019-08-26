import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/content-layout/header/header.component';
import { FooterComponent } from './layout/content-layout/footer/footer.component';
import { PageNotFoundComponent } from './layout/content-layout/page-not-found/page-not-found.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './shared/modals/modal.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
