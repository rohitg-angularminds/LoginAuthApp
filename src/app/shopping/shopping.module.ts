import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { CustomerInterceptor } from '../services/interceptors/customer.interceptor';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule
  ],
  providers: [

  ]
})
export class ShoppingModule { }
