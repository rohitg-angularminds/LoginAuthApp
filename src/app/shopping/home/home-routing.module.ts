import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";


const routes : Routes = [
  {
    path:'',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
      path:'products',
      component: HomeComponent
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class HomeRoutingModule {}

