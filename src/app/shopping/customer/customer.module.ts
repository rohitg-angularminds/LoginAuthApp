import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerComponent,
    CustProfileComponent,
    AddressComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
