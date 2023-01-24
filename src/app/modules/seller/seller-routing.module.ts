import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SellerProfileGuard } from '../../services/guards/seller.guard';
import { SellerAuthComponent } from 'src/app/layouts/seller-layout/auth/seller-auth.component';
import { SellerAppComponent } from 'src/app/layouts/seller-layout/app/seller-app.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: SellerAuthComponent,
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
    component: SellerAppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [SellerProfileGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
