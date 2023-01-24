import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  CustomerAuthComponent } from './auth/customer-auth.component';
import {  CustomerAppComponent } from './app/customer-app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/components/layout/shared.module';



@NgModule({
  declarations: [
    CustomerAppComponent,
    CustomerAuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class ShoppingLayoutModule { }
