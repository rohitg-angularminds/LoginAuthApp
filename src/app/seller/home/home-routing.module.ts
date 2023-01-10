import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, ProfileGuard } from '../../guards/seller.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyprofileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'products',
    // component: ProductsComponent,
    children: [
      {
        path: 'product-details',
        component: ProductDetailsComponent,
      },
      {
        path: '',
        component: ProductsComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
