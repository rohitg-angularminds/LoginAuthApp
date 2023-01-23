import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorToastComponent } from './error-toast/error-toast.component';
import { SuccessToastComponent } from './success-toast/success-toast.component';
import { CustHeaderComponent } from './cust-header/cust-header.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorToastComponent,
    SuccessToastComponent,
    CustHeaderComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorToastComponent,
    CustHeaderComponent,
    SuccessToastComponent,
    ReactiveFormsModule,
    FormsModule,
    PaymentComponent
  ]
})
export class SharedModule { }
