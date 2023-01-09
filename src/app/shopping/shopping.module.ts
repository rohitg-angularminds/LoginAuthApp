import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CustRegistrationComponent } from './cust-registration/cust-registration.component';
import { CustLoginComponent } from './cust-login/cust-login.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    CustRegistrationComponent,
    CustLoginComponent,
    CustProfileComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule { }
