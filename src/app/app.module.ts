import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CommonInterceptor } from './services/common.interceptor';

const google_clientid = "893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass : CommonInterceptor, multi:true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
          authLogin: false,
          providers: [{
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(google_clientid)
              }]
      } as SocialAuthServiceConfig
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }

//
