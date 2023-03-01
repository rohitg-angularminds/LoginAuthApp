import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAuthComponent } from './auth/seller-auth.component';
import { SellerAppComponent } from './app/seller-app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/components/layout/shared.module';

@NgModule({
  declarations: [SellerAuthComponent, SellerAppComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class SellerLayoutModule {}
