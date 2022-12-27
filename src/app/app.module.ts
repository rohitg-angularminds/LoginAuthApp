import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule,} from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY , RecaptchaV3Module} from 'ng-recaptcha';





@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaV3Module,
    HttpClientModule
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
