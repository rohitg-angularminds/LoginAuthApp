import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    CustomerComponent,
    AddressComponent,
    ProfileComponent,
    EditProfileComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [AddressComponent, ]
})
export class CustomerModule { }
