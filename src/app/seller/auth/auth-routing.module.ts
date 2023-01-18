import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SellerLoginGuard } from '../../services/guards/seller.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes : Routes    = [

    {
      path:'login',
      component: LoginComponent,
      canActivate: [SellerLoginGuard]
    },
    {
      path:'register',
      component: RegistrationComponent,
      canActivate: [SellerLoginGuard]
    },
    {
      path:'reset-password',
      component: ResetPasswordComponent,
      canActivate: [SellerLoginGuard]
    },
    {
      path:'verify-email',
      component: VerifyEmailComponent
    }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
