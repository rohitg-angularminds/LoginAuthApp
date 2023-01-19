import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerModule } from '../customer/customer.module';

@NgModule({
  declarations: [HomeComponent, ProductDetailsComponent, CartComponent, CheckoutComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CustomerModule],
})

export class HomeModule {}
