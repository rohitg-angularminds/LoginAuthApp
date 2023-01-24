import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CustRegistrationComponent } from './cust-registration/cust-registration.component';
import { CustLoginComponent } from './cust-login/cust-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/layout/shared.module';


@NgModule({
  declarations: [  CustRegistrationComponent,
    CustLoginComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
