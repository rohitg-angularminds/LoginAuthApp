import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { SellerAuthComponent } from './layouts/seller-layout/auth/seller-auth.component';
import { CustomerAppComponent } from './layouts/shopping-layout/app/customer-app.component';

const routes: Routes = [
  {
    path: 'seller',
    loadChildren: () =>
      import('./modules/seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/shopping/shopping.module').then(
        (m) => m.ShoppingModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
