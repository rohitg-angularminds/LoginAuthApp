import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {SellerRoutingModule} from './seller-routing.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SellerInterceptor } from '../services/interceptors/seller.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerRoutingModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: SellerInterceptor, multi: true }
  // ]
})
export class SellerModule { }
