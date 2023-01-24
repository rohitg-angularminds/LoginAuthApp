import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SellerLayoutModule } from './seller-layout/seller-layout.module';
import { ShoppingLayoutModule } from './shopping-layout/shopping-layout.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SellerLayoutModule,
    ShoppingLayoutModule
  ]
})
export class LayoutsModule { }
