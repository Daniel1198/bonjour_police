import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftBarComponent } from './tpl/left-bar/left-bar.component';
import { TopBarComponent } from './tpl/top-bar/top-bar.component';
import { FooterBarComponent } from './tpl/footer-bar/footer-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from './tpl/loader/loader.component';
import { ErrorPageComponent } from './tpl/error-page/error-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LeftBarComponent,
    TopBarComponent,
    FooterBarComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        /* whitelistedDomains: ['localhost'],
        blacklistedRoutes: ['localhost/auth/login'],*/
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
