import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustProfileComponent } from './customer/cust-profile/cust-profile.component';
import { HomeComponent } from './home/home.component';
import { CustomerLoginGuard, CustomerProfileGuard } from '../services/guards/customer.guard';

const routes: Routes = [

  {
    path:'',
    loadChildren: () => import('../shopping/home/home.module').then((m) => m.HomeModule),
  },
  {
    path:'profile',
    loadChildren: () => import('../shopping/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path:'auth',
    loadChildren: () => import('../shopping/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [CustomerLoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
