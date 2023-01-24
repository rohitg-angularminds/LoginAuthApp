import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAppComponent } from 'src/app/layouts/shopping-layout/app/customer-app.component';
import { CustomerAuthComponent } from 'src/app/layouts/shopping-layout/auth/customer-auth.component';
import {
  CustomerLoginGuard,
  CustomerProfileGuard,
} from '../../services/guards/customer.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: CustomerAuthComponent,
    canActivate: [CustomerLoginGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: CustomerAppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
          canActivate:[CustomerProfileGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
