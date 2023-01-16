import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProfileGuard } from 'src/app/services/guards/customer.guard';
import { HomeComponent } from '../home/home.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';
import { CustomerComponent } from './customer.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path:'',
        component: ProfileComponent,
      },
      {
        path:'address',
        component: AddressComponent,
      },
      {
        path:'edit-profile',
        component: EditProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
